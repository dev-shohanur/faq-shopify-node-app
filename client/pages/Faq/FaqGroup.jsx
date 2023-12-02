import {
  Button,
  Form,
  FormLayout,
  Frame,
  LegacyStack,
  Modal,
  Text,
  TextField,
} from "@shopify/polaris";
import React, { useCallback, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

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

const FaqGroup = ({
  _id,
  name,
  active,
  activeId,
  isNewGroup,
  handleModalChange,
  orders,
}) => {
  const group = orders.filter((order) => order._id === _id);

  const [title, setTitle] = useState(group[0].name);
  const [description, setDescription] = useState(group[0].description);

  const handleUpdateChange = useCallback((value, setData) => {
    setData(value);
  }, []);

  const handleClose = () => {
    handleModalChange(false, _id);
  };

  const postOptions = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ name: title, description }),
  };
  const [responseDataPost, fetchContentPost] = useDataFetcher(
    "",
    "/api/apps/faq",
    postOptions
  );
  const handlePost = (event) => {
    fetchContentPost();
    setTitle("");
    setDescription("");
  };

  useEffect(() => {
    console.log(isNewGroup, "Md Shohanur Rahman 111");
    if (isNewGroup) {
      setTitle("");
      setDescription("");
    } else {
      setTitle(group[0].name);
      setDescription(group[0].description);
    }
  }, [isNewGroup]);
  console.log(isNewGroup);
  console.log({ title, description });

  return (
    <Frame>
      <Modal
        open={!isNewGroup ? active && activeId === _id : active}
        onClose={handleClose}
        title="Export customers"
        primaryAction={{
          content: "Export customers",
          onAction: handleClose,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: handleClose,
          },
        ]}
      >
        <Modal.Section>
          <LegacyStack vertical>
            <Text>Md Shohanur Rahman</Text>
            <Form onSubmit={handlePost}>
              <FormLayout>
                <TextField
                  label="Title"
                  value={title}
                  onChange={(value) => handleUpdateChange(value, setTitle)}
                  autoComplete="off"
                />
                <TextField
                  label="Description"
                  value={description}
                  onChange={(value) =>
                    handleUpdateChange(value, setDescription)
                  }
                  autoComplete="off"
                />
                <Button submit variant="primary">
                  Submit
                </Button>
              </FormLayout>
            </Form>
          </LegacyStack>
        </Modal.Section>
      </Modal>
    </Frame>
  );
};

export default FaqGroup;
