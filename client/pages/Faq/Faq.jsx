import React, { useCallback, useEffect, useState } from "react";
import "../../App.css";
import {
  Button,
  IndexTable,
  LegacyCard,
  useIndexResourceState,
  Text,
  Badge,
  TextField,
  Card,
  InlineGrid,
  FormLayout,
  Form,
  ButtonGroup,
  Icon,
  Frame,
  Modal,
  LegacyStack,
  ChoiceList,
} from "@shopify/polaris";
import useFetch from "../../hooks/useFetch";
import { DeleteMajor, EditMajor } from "@shopify/polaris-icons";
import FaqGroup from "./FaqGroup";

const useDataFetcher = (initialState, url, options) => {
  const [data, setData] = useState(initialState);
  const fetch = useFetch();

  const fetchData = async () => {
    setData("loading...");
    const result = await (await fetch(url, options)).json();
    setData(result);
  };

  return [data, fetchData];
};

const Faq = () => {
  const [orders, setOrders] = useState([]);

  const [responseData, fetchContent] = useDataFetcher("", "/api/apps/faq");
  useEffect(() => {
    fetchContent();
    if (responseData.success) {
      setOrders([...responseData.result]);
    }
  }, [responseData, fetchContent]);

  const resourceName = {
    singular: "order",
    plural: "orders",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(orders);
  const [active, setActive] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [isNewGroup, setIsNewGroup] = useState(true);
  const handleModalChange = useCallback(
    (isNew, id) => {
      setIsNewGroup(isNew);
      setActiveId(id);
      setActive(!active);
    },
    [active]
  );
  const CURRENT_PAGE = "current_page";

  const rowMarkup = orders.map(
    ({ _id, id, name, description, order }, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {index + 1}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{name}</IndexTable.Cell>
        <IndexTable.Cell>{description}</IndexTable.Cell>
        <IndexTable.Cell>
          <ButtonGroup>
            <Button variant="primary" url={`/faq/${id}`}>
              FAQ's
            </Button>
            <Button
              variant="primary"
              icon={EditMajor}
              tone="success"
              onClick={() => handleModalChange(false, _id)}
            >
              Edit
            </Button>
            <Button variant="primary" icon={DeleteMajor} tone="critical">
              Delete
            </Button>
          </ButtonGroup>
        </IndexTable.Cell>
        <div className="hidden">
          <FaqGroup
            _id={_id}
            name={name}
            active={active}
            orders={orders}
            activeId={activeId}
            isNewGroup={isNewGroup}
            handleModalChange={handleModalChange}
          />
          ;
        </div>
      </IndexTable.Row>
    )
  );

  return (
    <div className="w-full">
      <div>
        <Button variant="primary" onClick={() => handleModalChange(true)}>
          Create New Group
        </Button>
      </div>
      <LegacyCard>
        <IndexTable
          resourceName={resourceName}
          itemCount={orders.length}
          headings={[
            { title: "index" },
            { title: "Name" },
            { title: "Description" },
            { title: "Actions" },
          ]}
        >
          {rowMarkup}
        </IndexTable>
      </LegacyCard>
    </div>
  );
};

export default Faq;
