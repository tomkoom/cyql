import React, { FC, useState, ChangeEvent } from "react"
import styled from "styled-components"
import CrossIcon from "@/components/icons/CrossIcon"
import { E8S, ICP_FEE_E8S } from "@/constants/constants"
import { Btn } from "@/components/btns/_index"
import type { Tokens } from "@/state/_types/types"
import { DISCORD_URL } from "@/constants/constants"

// hooks
import { useAuth } from "@/context/Auth"
import { useIcpLedger } from "@/hooks/_index"

// components
import { RootModal } from "../_index"
import { Steps } from "./_index"
import { TextInput } from "@/components/ui/_index"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import { selectWithdrawModalToken } from "@/state/modals/withdrawModal"
import { selectUser } from "@/state/user"
import { setIsLoading } from "@/state/loading"

interface WithdrawModalProps {
  isOpen: boolean
  onClose: () => void
}

const getWithdrawAmountString = (balanceIcp: Tokens, tokenSymbol: string): string => {
  return ((balanceIcp.e8s - ICP_FEE_E8S) / E8S).toString() + " " + tokenSymbol
}

const GetSupport: FC = (): JSX.Element => {
  return (
    <GetSupportStyled href={DISCORD_URL} target="_blank" rel="noreferrer noopener">
      get support
    </GetSupportStyled>
  )
}

const WithdrawModal: FC<WithdrawModalProps> = ({ isOpen, onClose }): JSX.Element => {
  const dispatch = useAppDispatch()
  const { accounntIdHex } = useAuth()
  const { refreshIcpBalance, sendIcp } = useIcpLedger()
  const [withdrawalAccountId, setWithdrawalAccountId] = useState<string>("")
  const [err, setErr] = useState<string>("")
  const [step, setStep] = useState<number>(1)

  // token
  const { balanceIcp } = useAppSelector(selectUser)
  const tokenSymbol = useAppSelector(selectWithdrawModalToken)
  const withdrawAmountStr = getWithdrawAmountString(balanceIcp, tokenSymbol)

  const reset = (): void => {
    onClose()
    setWithdrawalAccountId("")
    setStep(1)
  }

  const validateId = (): boolean => {
    setErr("")
    if (withdrawalAccountId === "") {
      setErr("can't be empty")
      return false
    }

    // validate account id

    return true
  }

  const setId = (e: ChangeEvent<HTMLInputElement>): void => {
    setWithdrawalAccountId(e.target.value)
  }

  const nextStep = (): void => {
    if (validateId()) {
      setStep(2)
    }
  }

  const prevStep = (): void => {
    setStep(1)
  }

  const confirm = async (): Promise<void> => {
    dispatch(setIsLoading(true))
    const amountE8s = balanceIcp.e8s
    await sendIcp(accounntIdHex, amountE8s)
    await refreshIcpBalance(accounntIdHex)
    dispatch(setIsLoading(false))
    reset()
  }

  return (
    <RootModal isOpen={isOpen}>
      <WithdrawModalStyled>
        <CrossIcon onClick={reset} />
        <Steps step={step} />

        {step === 1 ? (
          <div className="step">
            <Inputs>
              <div className="input_field">
                <label htmlFor="withdraw_address">
                  enter destination <span>account id</span>
                </label>

                <TextInput
                  id="withdraw_address"
                  type="text"
                  value={withdrawalAccountId}
                  placeholder={`e.g. ${accounntIdHex}`}
                  onChange={(e) => setId(e)}
                />
                {err && <span style={{ color: "var(--colorErr)" }}>{err}</span>}
              </div>

              <div className="input_field">
                <label htmlFor="withdraw_amount">
                  amount to withdraw (readonly, all amount to be withdrawn)
                </label>

                <TextInput id="withdraw_amount" type="text" value={withdrawAmountStr} readOnly />
                <span className="hint">(balance minus fee)</span>
              </div>
            </Inputs>

            <Btn btnType={"primary"} text={"withdraw"} onClick={nextStep} />
            <GetSupport />
          </div>
        ) : step === 2 ? (
          <div className="step">
            <Confirm>
              <div className="data_field">
                <p className="label">withdraw to</p>
                <p className="value">{withdrawalAccountId}</p>
              </div>

              <div className="data_field">
                <p className="label">withdrawal amount</p>
                <p className="value">{withdrawAmountStr}</p>
              </div>
            </Confirm>

            <div className="btns">
              <Btn btnType={"secondary"} text={"back"} onClick={prevStep} />
              <Btn btnType={"primary"} text={"confirm"} onClick={confirm} />
            </div>
          </div>
        ) : (
          ""
        )}
      </WithdrawModalStyled>
    </RootModal>
  )
}

const WithdrawModalStyled = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;

  /* ... */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  background-color: var(--background);
  padding: 1rem;

  > div.step {
    max-width: 48rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;

    > a {
      color: var(--secondaryColor);
      transition: var(--transition1);

      &:hover {
        color: var(--primaryColor);
      }
    }

    > div.btns {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
  }
`

const Inputs = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > div.input_field {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    text-align: center;

    > label {
      color: var(--secondaryColor);
      margin-bottom: 0.25rem;

      > span {
        color: var(--primaryColor);
        font-weight: var(--fwMedium);
      }
    }

    > input {
      box-sizing: border-box;
      padding: 0.5rem;
      text-align: center;
    }

    > span.hint {
      color: var(--tertiaryColor);
      margin-top: 0.125rem;
    }
  }
`

const Confirm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: var(--primaryColor);

  > div.data_field {
    text-align: center;
    background-color: var(--underlay1);
    padding: 0.75rem;

    > p.label {
      margin-bottom: 0.5rem;
    }
  }
`

const GetSupportStyled = styled.a`
  color: var(--secondaryColor);
  transition: var(--transition1);

  &:hover {
    color: var(--primaryColor);
  }
`

export default WithdrawModal
