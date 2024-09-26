import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormFieldType } from "./forms/PatintForm";
import React from "react";
import Image from "next/image";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dataFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const {
    fieldType,
    iconSrc,
    placeholder,
    showTimeSelect,
    dataFormat,
    iconAlt,
    renderSkeleton,
  } = props;
  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md bg-dark-400 border border-dark-500">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              width={24}
              height={24}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input text-white text-[18px] border-0"
            />
          </FormControl>
        </div>
      );

    case FormFieldType.PHONE_INPUT:
      return (
        // <div className="flex rounded-md bg-dark-400 border border-dark-500">
        <FormControl>
          <PhoneInput
            international
            withCountryCallingCode
            value={field.value}
            country="US"
            placeholder={placeholder}
            onChange={field.onChange}
            className="input-phone text-white w-full h-full"
          />
        </FormControl>
        // </div>
      );
    case FormFieldType.DARE_PICKER:
      return (
        <div className="flex shadow-md  items-center  rounded-md bg-dark-400 border border-dark-500">
          <Image
            alt="calender"
            width={25}
            height={25}
            src="/assets/icons/calendar.svg"
            className="mx-3"
          />
          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat={dataFormat ?? "MM/dd/yyyy"}
              showTimeSelect={showTimeSelect ?? false}
              timeInputLabel="Time:"
              wrapperClassName="date-picker"
            ></DatePicker>
          </FormControl>
        </div>
      );
    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;
    default:
      break;
  }
};
function CustomFromField(props: CustomProps) {
  const { control, fieldType, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className="text-white text-[17px] font-mono">
              {label}
            </FormLabel>
          )}
          <RenderField field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
}

export default CustomFromField;
