"use client";

import { useState } from "react";
import MyForm from "@/components/MyForm";
import DataTable from "@/components/DataTable";

export default function Home() {
  const [formDataList, setFormDataList] = useState([]);

  const handleFormSubmit = (data) => {
    setFormDataList((prev) => [...prev, data]);
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">ShadCN Form</h1>
      <MyForm onSubmit={handleFormSubmit} />
      <DataTable data={formDataList} />
    </main>
  );
}
