import { Card } from '@mui/material'
import React from 'react'
import { TransactionType } from '../../utils/util'

type Props = {
    type: TransactionType
}

const ResponseCard:React.FC<Props> = ({type}) => {
  return (
    <Card>
      {type} made successfully...
    </Card>
  )
}

export default ResponseCard
