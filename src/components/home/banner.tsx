import React, { useEffect, useState } from "react";
import { Carousel } from "antd";

import { getBannerList } from "../../API/home";
import { useSelector } from "react-redux";

const ComponentName = (props?: {}) => {
  const token = useSelector((state: any) => state?.token);

  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };
  const contentStyle: React.CSSProperties = {
    margin: 0,
    width: "100%",
  };

  const [showLoading, setShowLoading] = useState(false);
  const [bannerList, setBannerList] = useState<any>([]);
  const handleGetBanner = () => {
    setShowLoading(true);
    getBannerList().then((res: any) => {
      setBannerList(res.data);
      setShowLoading(false);
    });
  };

  useEffect(() => {
    if (!token) return;
    handleGetBanner();
  }, [token]);

  return (
    <div className="py-26 px-24 min-h-[166px]">
      {showLoading ? (
        <div className="w-full min-h-[166px] bg-[#eee] rounded-[10px]"></div>
      ) : (
        <Carousel
          afterChange={onChange}
          effect="fade"
          autoplay
          autoplaySpeed={4000}
          infinite={true}
        >
          {bannerList.map((item: any, index: number) => (
            <div key={index}>
              {/* onClick={() => {
              window.open(item.url);
            }} */}
              <img
                src={item.bannerUrl}
                style={contentStyle}
                className="rounded-[10px]"
                alt=""
              />
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default ComponentName;
