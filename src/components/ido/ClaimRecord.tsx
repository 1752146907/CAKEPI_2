import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useTranslation } from "react-i18next";
import { GetRefereeList, GetUserAccountDetail } from "../../API";
import { useSelector } from "react-redux";
import { dateFormat } from "../../utils/tool";
import { truncateMiddle } from "../../utils/truncateMiddle";
import NoData from "../NoData";

export default function Loding(props: any) {
  const [items, setItems] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    handleGetUserAccountDetail(props.accounttype);
  };
  const { t, i18n } = useTranslation();
  const token = useSelector((state: any) => state?.token);

  const [accounttype, setAccountType] = useState<any>(props.accounttype);
  const [accountTypeList, setAccountTypeList] = useState<any>([]);
  const handleGetUserAccountDetail = async (type: number) => {
    if (!token) {
      return;
    }
    setAccountType(props.accounttype);
    const data: any = await GetUserAccountDetail(type);
    if (items.length >= data) {
      setHasMore(false);
      return;
    }
    setAccountTypeList(data.data);
  };

  useEffect(() => {
    if (token && props.accounttype) {
      setAccountTypeList([]);
      setAccountType(props.accounttype);
      handleGetUserAccountDetail(props.accounttype);
    } else {
      setAccountType(1);
      handleGetUserAccountDetail(1);
    }
  }, [props.accounttype, token]);

  return (
    <div>
      {accountTypeList.length > 0 ? (
        <InfiniteScroll
          dataLength={accountTypeList.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={""}
        >
          {accountTypeList.map((item: any, key: any) => (
            <div className="box2-content-main" key={key}>
              <div className="li">{item.amount}</div>
              <div className="li"></div>
              <div className="li">
                {dateFormat("mm-dd HH:MM", new Date(item.createTime))}
              </div>
            </div>
          ))}
        </InfiniteScroll>
      ) : (
        <NoData></NoData>
      )}
    </div>
  );
}
