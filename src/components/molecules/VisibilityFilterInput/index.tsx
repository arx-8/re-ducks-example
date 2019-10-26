/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import React from "react"
import { VisibilityFilter, VisibilityFilterValue } from "src/domain/models/Todo"

type OwnProps = {
  children?: never
  filterValue: VisibilityFilter
  onChange: (filterValue: VisibilityFilter) => void
}

const FILTERS = [
  VisibilityFilterValue.all,
  VisibilityFilterValue.active,
  VisibilityFilterValue.completed,
]

export const VisibilityFilterInput: React.FC<OwnProps> = ({
  filterValue,
  onChange,
}) => {
  return (
    <div css={root}>
      {FILTERS.map((f) => (
        <label css={labelCss} key={f}>
          <input
            type="radio"
            value={f}
            checked={filterValue === f}
            onChange={(e) => onChange(e.target.value as VisibilityFilter)}
          />
          {f}
        </label>
      ))}
    </div>
  )
}

const root = css``

const labelCss = css`
  text-transform: capitalize;
  margin-left: 8px;
`
