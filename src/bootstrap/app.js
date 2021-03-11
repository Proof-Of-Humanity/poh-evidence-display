/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect, useMemo } from 'react'
import { ethers } from 'ethers'
import { Helmet } from 'react-helmet'

import useProvider from './dapp-api'
import _poh from './poh.json'

const Display = () => {
  const [parameters, setParameters] = useState()
  const [errored, setErrored] = useState()
  const { provider, error: providerError } = useProvider()
  const [submissionID, setSubmissionID] = useState()

  // Read query parameters.
  useEffect(() => {
    if (window.location.search[0] !== '?' || parameters) {
      console.warn('No parameters received in URL')
      return
    }
    const message = JSON.parse(
      window.location.search
        .substring(1)
        .replace(/%22/g, '"')
        .replace(/%7B/g, '{')
        .replace(/%3A/g, ':')
        .replace(/%2C/g, ',')
        .replace(/%7D/g, '}')
    )

    const {
      disputeID,
      arbitrableContractAddress,
      arbitratorContractAddress
    } = message

    if (!arbitrableContractAddress || !disputeID || !arbitratorContractAddress)
      return

    setParameters({
      arbitrableContractAddress,
      disputeID,
      arbitratorContractAddress
    })
  }, [parameters])

  const poh = useMemo(() => {
    if (!parameters || !provider) return
    const { arbitrableContractAddress } = parameters
    try {
      return new ethers.Contract(arbitrableContractAddress, _poh, provider)
    } catch (err) {
      console.error(`Error instantiating gtcr contract`, err)
      setErrored({
        title: 'Error loading dispute. Are you in the correct network?',
        subTitle: err.message
      })
      return null
    }
  }, [parameters, provider])

  useEffect(() => {
    ;(async () => {
      if (!poh || !parameters) return
      const { arbitratorContractAddress, disputeID } = parameters

      if (!arbitratorContractAddress || !disputeID) return

      const disputeData = await poh.arbitratorDisputeIDToDisputeData(arbitratorContractAddress, disputeID)
      setSubmissionID(disputeData?.submissionID)

    })()
  }, [parameters, poh])


  if (errored || providerError)
    return (
      <p>{errored || providerError}</p>
    )

  if (!submissionID) return null

  return (
    <a
      href={`https://proof-of-humanity.netlify.app/profile/${submissionID}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: 'rgba(0, 0, 0, 0.65)',
        fontFamily: 'Roboto, sans-serif',
        fontSize: '16px',
      }}
    >
      View Submission on Proof of Humanity
    </a>
  )
}


const App = () => (
  <>
    <Helmet>
      <title>Proof of Humanity</title>
    </Helmet>
    <Display />
  </>
)

export default App
