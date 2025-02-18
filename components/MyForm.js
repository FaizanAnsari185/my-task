"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { toast } from "sonner"; // ✅ Sonner import kiya

export default function MyForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    message: "",
    subscribe: false,
    terms: false,
    date: new Date(),
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? !prev[name] : value,
    }));
  };

  const handleCheckboxChange = (checked, name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, date }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSubmit === "function") {
      onSubmit(formData);
    }
    toast.success("Form Submitted! ✅"); // ✅ Sonner Toast Show
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="mb-4">
        <Label htmlFor="name">Name</Label>
        <Input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>

      <div className="mb-4">
        <Label htmlFor="email">Email</Label>
        <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>

      <div className="mb-4">
        <Label htmlFor="password">Password</Label>
        <Input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </div>

      <div className="mb-4">
        <Label htmlFor="message">Message</Label>
        <Textarea name="message" value={formData.message} onChange={handleChange} required />
      </div>

      <div className="mb-4 flex items-center space-x-2">
        <Checkbox id="subscribe" checked={formData.subscribe} onCheckedChange={(checked) => handleCheckboxChange(checked, "subscribe")} />
        <Label htmlFor="subscribe">Subscribe to Newsletter</Label>
      </div>

      <div className="mb-4 flex items-center space-x-2">
        <Switch id="terms" checked={formData.terms} onCheckedChange={(checked) => handleCheckboxChange(checked, "terms")} />
        <Label htmlFor="terms">Accept Terms & Conditions</Label>
      </div>

      <div className="mb-4">
        <Label>Select Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">{formData.date ? format(formData.date, "PPP") : "Pick a date"}</Button>
          </PopoverTrigger>
          <PopoverContent align="start">
            <Calendar mode="single" selected={formData.date} onSelect={handleDateChange} />
          </PopoverContent>
        </Popover>
      </div>

      <Button type="submit" className="w-full">Submit</Button>
    </form>
  );
}
