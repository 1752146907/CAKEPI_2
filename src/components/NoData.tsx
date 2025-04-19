import React from "react";
import { useTranslation } from "react-i18next";
import noDataImg from "../assets/image/noData.png";

export default function NoData() {
  const { t } = useTranslation();
  return (
    <div className="NoData flexCenter py-[40px] bottom-0">
      <div className="box">
        <img className="w-[100px] " src={noDataImg} alt="" />
        <div className="text-[#445370] text-[12px] pt-10">{t("No Data")}</div>
      </div>
    </div>
  );
}
