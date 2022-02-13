import { useEvent } from '../utils/useEvent'
import { FunctionComponent } from 'preact'
import { EVENT } from '../utils'

type ButtonEvent = { name: string; event: string }

const EventBtn: FunctionComponent<ButtonEvent> = ({ name, event }) => (
  <button
    class="action-button"
    id={event}
    onClick={useEvent(event).eventHandler}
  >
    {name}
  </button>
)

const ActionBlock = () => {
  return (
    <div class="action">
      <span class="action-title">Action</span>
      {(
        [
          'COLOR_DATA',
          'COLOR_CSS',
          'COLOR_CSS_MAP',
          'TYPO_DATA',
          'TYPO_CSS',
        ] as (keyof typeof EVENT)[]
      ).map((key) => (
        <EventBtn name={EVENT[key].name} event={EVENT[key].key} />
      ))}
      <div id="app"></div>
      <hr class="action-hr" />
      <EventBtn name={EVENT.DISMISS.name} event={EVENT.DISMISS.key} />
    </div>
  )
}
export default ActionBlock
