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
    cssColor: { name: 'to cssColor', event: 'toCssColor' },
    text: { name: 'Get Typography', event: 'getText' },
    cssFont: { name: 'to css font', event: 'toCssFont' },
    cancel: { name: 'Cancel', event: 'cancel' },
  }

  return (
    <div class="action">
      <span class="action-title">Action</span>
      {(
        ['color', 'cssColor', 'text', 'cssFont'] as (keyof typeof actions)[]
      ).map((key) => (
        <EventBtn name={actions[key].name} event={actions[key].event} />
      ))}
      <div id="app"></div>
      <hr class="action-hr" />
      <EventBtn name={actions.cancel.name} event={actions.cancel.event} />
    </div>
  )
}
export default ActionBlock
