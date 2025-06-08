"use client";
import { useEditPrompt } from "@/hooks/useEditPrompt.hook";
import PromptForm from "../common/prompt-form/PromptForm.component";

export default function EditPrompt({ id }: { id: string }) {
  const { isLoading, formData, handleEditPrompt, onChange } = useEditPrompt(id);
  console.log("edit page formData", formData);

  return (
    <PromptForm
      type="edit"
      isLoading={isLoading}
      formData={formData}
      handleSubmit={handleEditPrompt}
      onChange={onChange}
    />
  );
}
