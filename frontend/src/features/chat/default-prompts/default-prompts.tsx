import React from "react";
import { Card, Typography, Button, Avatar } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { OpenAIOutlined, OpenAIFilled, SmileOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface PromptCardProps {
  description: string;
  onClick: () => void;
}

const PromptCard: React.FC<PromptCardProps> = ({ description, onClick }) => (
  <div
    className="border rounded-2xl bg-white p-4 shadow-md hover:bg-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer flex items-center justify-center h-full"
    onClick={onClick}
  >
    <span className="text-center text-gray-500">{description}</span>
  </div>
);

const DEFAULT_PROMPTS = [
  "Give me game plan for early, mid, and late game.",
  "What items should I build?",
  "What are Leona's most played champions?",
  "Who is on a lose streak from their team?",
];

interface DefaultPromptsProps {
  handleSendMessage: (message: string) => void;
}

const DefaultPrompts: React.FC<DefaultPromptsProps> = ({
  handleSendMessage,
}) => {
  return (
    <div className="p-6 h-full flex justify-center flex-col">
      <div className="flex justify-center w-full p-10">
        <Avatar style={{ marginRight: 8 }} size={60} icon={<OpenAIFilled />} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {DEFAULT_PROMPTS.map((prompt) => (
          <PromptCard
            description={prompt}
            onClick={() => handleSendMessage(prompt)}
          />
        ))}
      </div>
    </div>
  );
};

export default DefaultPrompts;
