"use client";
import { useCreatePrompt } from "@/hooks/useCreatePrompt.hook";
import PromptForm from "../common/prompt-form/PromptForm.component";

export default function CreatePrompt() {
  const { isLoading, handleCreatePrompt, onChange, formData } =
    useCreatePrompt();
  return (
    <PromptForm
      type="create"
      isLoading={isLoading}
      formData={formData}
      handleSubmit={handleCreatePrompt}
      onChange={onChange}
    />
  );
}
