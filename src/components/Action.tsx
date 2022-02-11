import { useEvent } from '../utils/useEvent'
import { FunctionComponent } from 'preact'

type ButtonEvent = { name: string; event: string }

const EventBtn: FunctionComponent<ButtonEvent> = ({ name, event }) => (
  <button id={event} onClick={useEvent(event).eventHandler}>
    {name}
  </button>
)

const ActionBlock = () => {
  const actions = {
    color: { name: 'Get Color', event: 'getColor' },
    text: { name: 'Get Typography', event: 'getText' },
    cancel: { name: 'Cancel', event: 'cancel' },
  }

  return (
    <div class="action">
      <span class="action-title">Action</span>
      <EventBtn name={actions.color.name} event={actions.color.event} />
      <EventBtn name={actions.text.name} event={actions.text.event} />
      <div id="app"></div>
      <hr class="action-hr" />
      <EventBtn name={actions.cancel.name} event={actions.cancel.event} />
    </div>
  )
}
export default ActionBlock
