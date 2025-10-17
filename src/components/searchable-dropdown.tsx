"use client"

import * as React from "react"
import { useState, useRef, useEffect } from "react"
import { ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { useOnBoardingFormStore } from "@/app/store/zustand-stores/useOnboardingForm"
import { useModalStore } from "@/app/store/zustand-stores/useModelStore"



type optionType = {

    Make_ID: number,
    Make_Name: string

}

interface SearchableSelectProps {
    options: optionType[]
    value: string
    onChange: (value: string) => void
    placeholder?: string
    className?: string
}

const SearchableDropDown = ({
    options,
    onChange,
    placeholder,
}: SearchableSelectProps) => {
    const [allOptions, setAllOptions] = useState<optionType[]>(options)
    const [open, setOpen] = useState(false)
    const [width, setWidth] = useState<number | undefined>(undefined)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [visibleOptions, setVisibleOptions] = useState(options.slice(0, 100))
    const [selectedValue, setSelectedValue] = useState<string>()
    const [searchQuery, setSearchQuery] = useState<string>("")
    const { openModal } = useModalStore()

    const { updateForm } = useOnBoardingFormStore()
    const { form } = useOnBoardingFormStore()

    useEffect(() => {
        if (buttonRef.current) {
            setWidth(buttonRef.current.offsetWidth)
        }
    }, [open])


    useEffect(() => {
        setAllOptions(options)
    }, [options])

    useEffect(() => {
        if (allOptions.length < 1 && form.make) {
            openModal("unable to load make id")
            return
        }
        if (!form.make) {
            return
        }
        const findId = allOptions.find(item => item.Make_Name == form.make.toLocaleUpperCase())
        updateForm("makeId", findId?.Make_ID.toString() as string)

    }, [form.make, allOptions, updateForm, openModal])

    useEffect(() => {
        if (!searchQuery) {
            setVisibleOptions(allOptions.slice(0, 100))
        }
        else {
            const filteredOptions = allOptions.filter(item => item.Make_Name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())).slice(0, 100)
            setVisibleOptions(filteredOptions)
        }
    }, [searchQuery, allOptions])
    // const selectedLabel = options.find((option) => option.value === value)?.label

    return (
        <div className="">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        ref={buttonRef}
                        variant="outline"
                        role="combobox"
                        className="w-full py-6 justify-between"
                        onClick={() => {
                            console.log(options)
                            console.log(visibleOptions)
                            console.log(allOptions);

                            // setVisibleOptions(options.slice(0, 100))
                        }
                        }
                    >
                        {selectedValue || placeholder}
                        <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="p-0 "
                    style={{ width: width ? `${width}px` : "auto" }}
                >
                    <Command >
                        <CommandInput
                            onValueChange={(value) => setSearchQuery(value)}
                            placeholder="Search..." />
                        <CommandEmpty>No results found.</CommandEmpty>
                        <div className="max-h-64 overflow-y-auto">

                            <CommandGroup>
                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                {visibleOptions.map((option: any) => (
                                    <CommandItem
                                        key={option.Make_ID}
                                        onSelect={() => {
                                            onChange(option.Make_Name)
                                            setOpen(false)
                                            updateForm("makeId", option.Make_ID)
                                            setSelectedValue(option.Make_Name)

                                        }}
                                    >
                                        {option.Make_Name}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </div>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default SearchableDropDown