import React from "react";

import ExitFrame from "./ExitFrame";
import Index from "./pages/Index";
import BillingAPI from "./pages/debug/Billing";
import GetData from "./pages/debug/Data";
import DebugIndex from "./pages/debug/Index";
import ActiveWebhooks from "./pages/debug/Webhooks";
import Faq from "./pages/Faq/Faq";

const routes = {
  "/": () => <Index />,
  "/exitframe": () => <ExitFrame />,
  "/exitframe/:shop": ({ shop }) => <ExitFrame shop={shop} />,
  "/debug": () => <DebugIndex />,
  "/debug/webhooks": () => <ActiveWebhooks />,
  "/debug/billing": () => <BillingAPI />,
  "/faq": () => <Faq />,
  "/debug/data": () => <GetData />,

  //Add your routes here
};

export default routes;
