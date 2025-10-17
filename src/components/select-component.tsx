"use client"
import { useOnBoardingFormStore } from "@/app/store/zustand-stores/useOnboardingForm";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function SelectComponent({ placeholder, options, valueKey, classVariable }: { valueKey: string, placeholder: string, options?: { label: string, value: string }[], classVariable?: string }) {

    const { updateForm } = useOnBoardingFormStore()


    return (
        <Select onValueChange={(value) => {
            console.log(value);
            console.log(valueKey);

            updateForm(valueKey, value)
        }} >
            <SelectTrigger className={`w-full py-6 ${classVariable}`}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {options?.map((item, index) => {
                        return <SelectItem

                            key={index} value={item.value}>{item.label}</SelectItem>
                    })}
                    {/* <SelectItem value="est">Toyota</SelectItem>
                    <SelectItem value="cst">Benz</SelectItem>
                    <SelectItem value="mst">Honda</SelectItem> */}

                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
