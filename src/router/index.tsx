import React, { Suspense } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import PageLoding from "../components/PageLoding";
import MainLayout from "../Layout/MainLayout";
import DeputyLayout from "../Layout/DeputyLayout";

const Home = React.lazy(() => import("../view/home"));
const Friends = React.lazy(() => import("../view/friends"));
const Community = React.lazy(() => import("../view/community"));
const Account = React.lazy(() => import("../view/account/Account"));

export default function Router() {
  return (
    <Suspense fallback={<PageLoding></PageLoding>}>
      <Routes>
        <Route path="/*" element={<MainLayout />}>
          {/* <Route path=":address/">
            <Route index element={<IDO />}></Route>
            <Route path="IDO" element={<IDO />}></Route>
          </Route> */}

          {/* 首页 */}
          <Route path="" element={<Home />}></Route>
          {/* 好友 */}
          <Route path="friends" element={<Friends />}></Route>
          {/* 社区 */}
          <Route path="community" element={<Community />}></Route>
          {/* 我的 */}
          <Route path="account" element={<Account />}></Route>
        </Route>
        <Route path="/DeputyLayout" element={<DeputyLayout />}></Route>
      </Routes>
    </Suspense>
  );
}
