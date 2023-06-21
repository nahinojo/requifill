import React, { useState } from 'react'
import type { FC } from 'react'

const NewFieldItem: FC = (props) => {
  const [isSelections, setIsSelections] = useState(false)
  return (
      <div onClick={() => { setIsSelections(true) }}>
        {!isSelections &&
          <button>New Field Item</button>
        }
        {isSelections &&
          <div></div>
        }
      </div>
  )
}

export default NewFieldItem
