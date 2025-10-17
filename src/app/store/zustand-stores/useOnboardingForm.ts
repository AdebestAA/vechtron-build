import { create } from "zustand"
export interface OnBoardingFormType {
    make: string;
    model: string;
    name: string;
    type: string;
    vin: string;
    license_plate: string;
    year: number;
    odometer_unit: string;
    odometer: number;
    // id for vehicle make
    makeId?: string;
}



export const onBoardingForm: OnBoardingFormType = {
    make: "",
    model: "",
    name: "",
    type: "",
    vin: "",
    license_plate: "",
    year: 0,
    odometer_unit: "",
    odometer: 0,
    // id for vehicle make
    makeId: ""

}

type storeType = {
    form: OnBoardingFormType,
    updateForm: (key: string, value: string,) => void,
    updateAll: (formObject: OnBoardingFormType) => void

}
export const useOnBoardingFormStore = create<storeType>((set) => ({
    form: onBoardingForm,
    updateForm: (valueKey: string, value: string) => {
        set((state) => ({
            form: {
                ...state.form,
                [valueKey]: value,
            },
        }))

    },
    updateAll: (formObject: OnBoardingFormType) => {
        set(() => ({

            form: {
                ...formObject
            }
        }))
    }
}))