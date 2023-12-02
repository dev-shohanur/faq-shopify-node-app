import { AppProvider as PolarisProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import translations from "@shopify/polaris/locales/en.json";
import { useRoutes } from "raviger";
import routes from "./Routes";
import AppBridgeProvider from "./providers/AppBridgeProvider";
import "./App.css";

export default function App() {
  const RouteComponents = useRoutes(routes);

  return (
    <PolarisProvider i18n={translations}>
      <AppBridgeProvider>
        <ui-nav-menu>
          <a href="/debug/data">Fetch Data</a>
          <a href="/debug/billing">Billing API</a>
          <a href="/faq">FAQ</a>
          <a href="/layout">layOut</a>
        </ui-nav-menu>
        {RouteComponents}
      </AppBridgeProvider>
    </PolarisProvider>
  );
}
