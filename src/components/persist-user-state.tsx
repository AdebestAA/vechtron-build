"use client"
import { useSaveUserInfo } from "@/app/store/zustand-stores/use-save-user-info"
import { useEffect } from "react"


const PersistUserInfoState = () => {
  const { saveUserInfo } = useSaveUserInfo()

  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("userInfo") as string));

    saveUserInfo(JSON.parse(localStorage.getItem("userInfo") as string))
  }, [saveUserInfo])
  return (
    <>
    </>
  )
}

export default PersistUserInfoState