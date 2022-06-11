import Text from "components/basic/Text";

export default {
  title: "Component/Text",
  component: Text,
  argTypes: {
    fontSize: { defaultValue: 24, control: "number" },
    strong: { control: "boolean" },
    underline: { control: "boolean" },
    delete: { control: "boolean" },
    color: { control: "color" },
    block: { control: "boolean" },
    paragraph: { control: "boolean" },
    mark: { control: "boolean" },
    code: { control: "boolean" },
  },
};

export const Default = (args) => {
  return <Text {...args}>Text</Text>;
};
