"use client"

import { BeatLoader } from "react-spinners"
import { CardWrapper } from "./card-wrapper"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { newVerification } from "@/actions/new-verification"
import { FormSuccess } from "../form-success"
import { FormError } from "../form-error"

export const NewVerificationForm = () => {
  const searchParams = useSearchParams()
  const token= searchParams.get("token")

  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const onSubmit = useCallback(() => {
    if(success || error) return;
    if(!token) {
      setError("Missing token!");
      return
    };
    newVerification(token)
      .then((data) => {
        setSuccess(data?.success)
        setError(data?.error)
      })
      .catch((err) => {
        setError("Something went wrong!")
      })
  }, [token, success, error])

  useEffect(()=> {
    onSubmit()
  }, [onSubmit])
  
  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
      showSocial={false}
    >
      <div className="flex items-center w-full justify-center">
        {
          !success && !error && (
            <BeatLoader />
          )
        }
        <FormSuccess message={success} />
        {
          !success && (
            <FormError message={error} />
          )
        }
      </div>
    </CardWrapper>
  )
}