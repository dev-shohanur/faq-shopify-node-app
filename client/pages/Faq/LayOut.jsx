import {
  Bleed,
  BlockStack,
  Box,
  Card,
  Divider,
  InlineGrid,
  Page,
  SkeletonBodyText,
  SkeletonDisplayText,
} from "@shopify/polaris";
import {
  ArchiveMinor,
  DeleteMinor,
  DuplicateMinor,
} from "@shopify/polaris-icons";
import React from "react";

const LayOut = () => {
  const SkeletonLabel = (props) => {
    return (
      <Box
        background="bg-fill-tertiary"
        minHeight="1rem"
        maxWidth="5rem"
        borderRadius="base"
        {...props}
      />
    );
  };

  return (
    <Page
      backAction={{ content: "Products", url: "/products" }}
      title="Product"
      secondaryActions={[
        {
          content: "Duplicate",
          icon: DuplicateMinor,
          accessibilityLabel: "Secondary action label",
          onAction: () => alert("Duplicate action"),
        },
        {
          content: "Archive",
          icon: ArchiveMinor,
          accessibilityLabel: "Secondary action label",
          onAction: () => alert("Archive action"),
        },
        {
          content: "Delete",
          icon: DeleteMinor,
          destructive: true,
          accessibilityLabel: "Secondary action label",
          onAction: () => alert("Delete action"),
        },
      ]}
      pagination={{
        hasPrevious: true,
        hasNext: true,
      }}
    >
      <InlineGrid columns={{ xs: 1, md: "2fr 1fr" }} gap="400">
        <BlockStack gap="400">
          <Card roundedAbove="sm">
            <BlockStack gap="400">
              <SkeletonLabel />
              <Box border="divider" borderRadius="base" minHeight="2rem" />
              <SkeletonLabel maxWidth="8rem" />
              <Box border="divider" borderRadius="base" minHeight="20rem" />
            </BlockStack>
          </Card>
          <Card roundedAbove="sm">
            <BlockStack gap="400">
              <SkeletonDisplayText size="small" />
              <InlineGrid columns={{ xs: 1, md: 2 }}>
                <Box border="divider" borderRadius="base" minHeight="10rem" />
                <Box border="divider" borderRadius="base" minHeight="10rem" />
              </InlineGrid>
            </BlockStack>
          </Card>
        </BlockStack>
        <BlockStack gap={{ xs: "400", md: "200" }}>
          <Card roundedAbove="sm">
            <BlockStack gap="400">
              <SkeletonDisplayText size="small" />
              <Box border="divider" borderRadius="base" minHeight="2rem" />
              <Box>
                <Bleed marginInline={{ xs: 400, sm: 500 }}>
                  <Divider />
                </Bleed>
              </Box>
              <SkeletonLabel />
              <Divider />
              <SkeletonBodyText />
            </BlockStack>
          </Card>
          <Card roundedAbove="sm">
            <BlockStack gap="400">
              <SkeletonLabel />
              <Box border="divider" borderRadius="base" minHeight="2rem" />
              <SkeletonLabel maxWidth="4rem" />
              <Box border="divider" borderRadius="base" minHeight="2rem" />
              <SkeletonLabel />
              <SkeletonBodyText />
            </BlockStack>
          </Card>
        </BlockStack>
      </InlineGrid>
    </Page>
  );
};

export default LayOut;
