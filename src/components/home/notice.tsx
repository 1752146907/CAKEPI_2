import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import { getNoticeList } from "../../API/home";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ComponentName = (props?: {}) => {
  const [noticeList, setNoticeList] = useState<any>([]);
  const token = useSelector((state: any) => state?.token);

  const handleGetBanner = () => {
    setShowLoading(true);
    getNoticeList().then((res: any) => {
      setNoticeList(res.data);
      setShowLoading(false);
    });
  };

  useEffect(() => {
    if (!token) return;
    handleGetBanner();
  }, [token]);

  const [showLoading, setShowLoading] = useState(false);
  const navigate = useNavigate();
  const handleNoticeList = (id: any) => {
    navigate("/home/noticeList", { state: { id: id } });
  };

  return (
    <div className="flex px-24 py-16 items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M11.9817 1.37073L6.6564 6.69838H2.88207C1.90131 6.69838 1.10596 7.49373 1.10596 8.47449V15.5783C1.10596 16.5599 1.90131 17.3545 2.88207 17.3545H6.65638L11.9817 22.6836C12.9624 22.6836 13.757 21.8883 13.757 20.9075V3.14684C13.7571 2.16608 12.9625 1.37073 11.9817 1.37073H11.9817ZM11.9817 20.846L7.32163 15.7044H2.88207V8.6007H7.32163L11.9817 3.45847V20.846Z"
          fill="#121212"
          fillOpacity="0.6"
        />
        <path
          d="M22.5072 12.8061C22.6826 12.8061 22.8244 12.4571 22.8244 12.0271C22.8244 11.5971 22.6826 11.248 22.5072 11.248H20.2864C20.1111 11.248 19.9692 11.597 19.9692 12.0271C19.9692 12.4571 20.1111 12.8061 20.2864 12.8061H22.5072Z"
          fill="#121212"
          fillOpacity="0.6"
        />
        <path
          d="M22.748 2.73857C22.9 2.65085 22.8483 2.27772 22.6332 1.90532C22.4182 1.53293 22.1209 1.3016 21.969 1.3893L20.0457 2.49968C19.8938 2.5874 19.9455 2.96053 20.1605 3.33293C20.3755 3.70532 20.6728 3.93663 20.8248 3.84893L22.748 2.73857Z"
          fill="#121212"
          fillOpacity="0.6"
        />
        <path
          d="M22.748 21.3157C22.9 21.4034 22.8483 21.7765 22.6332 22.149C22.4182 22.5213 22.1209 22.7527 21.969 22.665L20.0457 21.5546C19.8938 21.4669 19.9455 21.0938 20.1605 20.7213C20.3755 20.3489 20.6728 20.1176 20.8248 20.2053L22.748 21.3157Z"
          fill="#121212"
          fillOpacity="0.6"
        />
        <path
          d="M15.0067 16.0174C14.8483 15.5912 14.8921 15.1869 15.3184 15.0285C16.3949 14.5315 16.9087 13.5645 17.0401 12.3516C17.1934 10.9364 16.5161 9.6359 15.347 9.10021C14.9645 8.85421 14.8062 8.42809 15.0521 8.04564C15.2982 7.66323 15.7244 7.50487 16.1067 7.75082C17.8386 8.75655 18.8763 10.5052 18.6574 12.5268C18.4821 14.1441 17.4983 15.6738 15.9956 16.3291C15.6444 16.5279 15.1736 16.3974 15.0067 16.0175V16.0174Z"
          fill="#121212"
          fillOpacity="0.6"
        />
      </svg>
      <div className="flex-1 h-24 line-clamp-1">
        {showLoading ? (
          <div className="pl-[12px]">
            <div className="w-full h-[24px] bg-[#eee] rounded-[10px]"></div>
          </div>
        ) : (
          <Carousel
            autoplay
            dots={false}
            dotPosition="left"
            autoplaySpeed={5000}
            infinite={true}
          >
            {/* <div className=" h-[24px] flex items-center text-[14px] font-bold text-[#6E6E6E] pl-8 line-clamp-1 leading-[24px]">
            公告1：股票拆分的公告股票拆分的公告股票拆分的公告股票拆分的公告股票拆分的公告股票拆分的公告股票拆分的公告股票拆分的公告
          </div> */}
            {noticeList.map((item: any, index: number) => (
              <div
                onClick={() => {
                  handleNoticeList(item.id);
                }}
                key={index}
                className=" h-[24px] flex items-center text-[14px] font-bold text-[#6E6E6E] pl-8 line-clamp-1 leading-[24px]"
              >
                {item.title}
              </div>
            ))}
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default ComponentName;
