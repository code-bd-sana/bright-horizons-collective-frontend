/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { Controller, DefaultValues, UseFormReturn, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, UploadCloud, X } from 'lucide-react';
import Image from 'next/image';

export type FormFieldConfig = {
  name: string;
  label: string;
  type:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'textarea'
    | 'select'
    | 'checkbox'
    | 'radio'
    | 'file';
  placeholder?: string;
  options?: { label: string; value: string }[]; // For select and radio
  description?: string;
  multiple?: boolean; // For file upload
  accept?: string; // For file upload
};

interface DynamicFormProps<T extends z.ZodType<any, any>> {
  schema: T;
  defaultValues: DefaultValues<z.infer<T>>;
  fields?: FormFieldConfig[];
  onSubmit: (data: z.infer<T>) => Promise<void> | void;
  submitText?: string;
  isLoading?: boolean;
  children?: (form: UseFormReturn<z.infer<T>>) => React.ReactNode;
}

export function DynamicForm<T extends z.ZodType<any, any>>({
  schema,
  defaultValues,
  fields = [],
  onSubmit,
  submitText = 'Submit',
  isLoading = false,
  children,
}: DynamicFormProps<T>) {
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema) as any,
    defaultValues,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const [imagePreview, setImagePreview] = useState<Record<string, string | null>>({});

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any,
    fieldName: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      field.onChange(file); // Send file object to react-hook-form

      // If it is an image, generate a preview
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview((prev) => ({ ...prev, [fieldName]: reader.result as string }));
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const renderField = (config: FormFieldConfig, field: any) => {
    switch (config.type) {
      case 'textarea':
        return <Textarea placeholder={config.placeholder} {...field} />;

      case 'select':
        return (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger>
              <SelectValue placeholder={config.placeholder || 'Select an option'} />
            </SelectTrigger>
            <SelectContent>
              {config.options?.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'checkbox':
        return (
          <div className="flex items-center space-x-2 h-10">
            <Checkbox checked={field.value} onCheckedChange={field.onChange} id={config.name} />
            <Label htmlFor={config.name} className="text-sm font-normal cursor-pointer">
              {config.label}
            </Label>
          </div>
        );

      case 'radio':
        return (
          <RadioGroup
            onValueChange={field.onChange}
            defaultValue={field.value}
            className="flex flex-col space-y-2 mt-2"
          >
            {config.options?.map((opt) => (
              <div key={opt.value} className="flex items-center space-x-2">
                <RadioGroupItem value={opt.value} id={`${config.name}-${opt.value}`} />
                <Label
                  htmlFor={`${config.name}-${opt.value}`}
                  className="font-normal cursor-pointer"
                >
                  {opt.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'file':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor={`file-upload-${config.name}`}
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition-colors border-input group"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadCloud className="w-8 h-8 mb-3 text-muted-foreground group-hover:text-primary transition-colors" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  {config.accept && (
                    <p className="text-xs text-muted-foreground">Accepted: {config.accept}</p>
                  )}
                </div>
                <input
                  id={`file-upload-${config.name}`}
                  type="file"
                  className="hidden"
                  accept={config.accept}
                  onChange={(e) => handleImageChange(e, field, config.name)}
                />
              </label>
            </div>

            {/* Image Preview specifically for images */}
            {imagePreview[config.name] && (
              <div className="relative w-24 h-24 rounded-lg overflow-hidden border shadow-sm">
                <Image
                  src={imagePreview[config.name] as string}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview((prev) => ({ ...prev, [config.name]: null }));
                    field.onChange(null);
                  }}
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 hover:bg-black transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        );

      default:
        // text, email, password, number
        return (
          <Input
            type={config.type}
            placeholder={config.placeholder}
            {...field}
            onChange={(e) => {
              const val = e.target.value;
              field.onChange(config.type === 'number' && val ? Number(val) : val);
            }}
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-6">
      {children ? (
        children(form)
      ) : (
        <>
          <div className="space-y-4">
            {fields.map((config) => (
              <div key={config.name} className="space-y-2">
                {config.type !== 'checkbox' && (
                  <Label htmlFor={config.name} className="font-semibold text-foreground">
                    {config.label}
                  </Label>
                )}

                <Controller
                  name={config.name as any}
                  control={control}
                  render={({ field }) => renderField(config, field)}
                />

                {config.description && (
                  <p className="text-sm text-muted-foreground">{config.description}</p>
                )}

                {errors[config.name] && (
                  <p className="text-sm text-destructive font-medium">
                    {errors[config.name]?.message as string}
                  </p>
                )}
              </div>
            ))}
          </div>

          <Button type="submit" disabled={isLoading} className="w-full h-11">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {submitText}
          </Button>
        </>
      )}
    </form>
  );
}
