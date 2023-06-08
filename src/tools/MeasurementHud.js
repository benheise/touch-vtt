import {MODULE_NAME} from '../config/ModuleConstants'
import {wrapMethod} from '../utils/Injection'
import FoundryCanvas from '../foundryvtt/FoundryCanvas'
import Vectors from '../logic/Vectors.js'
import {MEASUREMENT_HUD_LEFT, MEASUREMENT_HUD_OFF, MEASUREMENT_HUD_SETTING} from '../config/TouchSettings.js'

class TouchMeasurementHud extends Application {
  constructor({ canvasTouchToMouseAdapter }) {
    super()

    this._canvasTouchToMouseAdapter = canvasTouchToMouseAdapter
    this._worldPosition = null
    this._screenPosition = {}
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "touch-measurement-hud",
      template: `/modules/${MODULE_NAME}/templates/measurement-hud.hbs`,
      popOut: false,
      width: 200,
      height: 100,
      left: 150,
      top: 80,
      scale: 1,
      minimizable: false,
      resizable: false,
      dragDrop: [],
      tabs: [],
      scrollY: [],
    })
  }

  getData(...args) {
    const data = super.getData(...args)
    data.id = this.options.id
    data.top = this._screenPosition.top
    data.left = this._screenPosition.left
    data.offsetX = this.calcOffsetX()
    data.showRuler = !Vectors.isEqual(this._worldPosition ?? {}, this.lastWaypoint)
    data.showMove = this.canMoveToken()
    return data
  }

  activateListeners(html) {
    html.find('.waypoint').on('pointerdown', () => {
      const ruler = FoundryCanvas.ruler
      if (ruler != null && typeof ruler._addWaypoint === 'function') {
        ruler._addWaypoint(this._worldPosition)
        this.render()
      }
    })

    html.find('.move').on('pointerdown', () => {
      const ruler = FoundryCanvas.ruler
      if (ruler != null && typeof ruler.moveToken === 'function') {
        ruler.moveToken()
        this.render()
      }
    })
  }

  async show(worldPosition) {
    this._worldPosition = worldPosition
    const screenPosition = FoundryCanvas.worldToScreen(worldPosition)
    this.setScreenPosition({
      left: screenPosition.x,
      top: screenPosition.y,
    })

    const states = this.constructor.RENDER_STATES
    await this.render(this._state <= states.NONE)

    this._canvasTouchToMouseAdapter.disableGestures()
  }

  clear() {
    const states = this.constructor.RENDER_STATES
    if (this._state <= states.NONE) return
    this._state = states.CLOSING

    this.element.hide()
    this._state = states.NONE

    this._canvasTouchToMouseAdapter.enableGestures()
  }

  setScreenPosition({top, left}) {
    this._screenPosition = { top, left }
  }

  get lastWaypoint() {
    const ruler = FoundryCanvas.ruler
    return (ruler && ruler.waypoints[ruler.waypoints.length - 1]) ?? {}
  }

  canMoveToken() {
    const ruler = FoundryCanvas.ruler
    if (ruler == null) {
      return false
    }
    if (game.paused && !game.user.isGM) {
      ui.notifications.warn("GAME.PausedWarning", {localize: true})
      return false
    }
    if (!ruler.visible || !ruler.destination) return false
    return ruler._getMovementToken() != null
  }

  calcOffsetX() {
    const offset = FoundryCanvas.worldToScreenLength(FoundryCanvas.gridSize) * 0.75
    if (getSettingValue() === MEASUREMENT_HUD_LEFT) {
      return `calc(-100% - ${offset}px)`
    } else {
      return `${offset}px`
    }
  }
}

export function initMeasurementHud({ canvasTouchToMouseAdapter }) {
  if (canvas.hud.touchMeasurement == null) {
    canvas.hud.touchMeasurement = new TouchMeasurementHud({ canvasTouchToMouseAdapter })

    wrapMethod('Ruler.prototype._onMouseMove', function (wrapped, event, ...args) {
      event.data.destination.originType = event.data?.destination ? event.data?.originalEvent?.originType : event.data.destination.originType;
      return wrapped.call(this, event, ...args)
    })

    wrapMethod('Ruler.prototype.measure', function (wrapped, destination, ...args) {
      const segments = wrapped.call(this, destination, ...args)
      if (isOwnRuler(this) && isEnabled() && destination?.originType === 'touch') {
        if (Array.isArray(segments) && segments.length > 0) {
          const lastSegment = segments[segments.length - 1]
          canvas.hud.touchMeasurement.show(lastSegment.ray.B)
        } else {
          canvas.hud.touchMeasurement.clear()
        }
      }
      return segments
    })

    wrapMethod('Ruler.prototype.clear', function (wrapped, ...args) {
      const superResult = wrapped.call(this, ...args)
      if (isOwnRuler(this)) {
        canvas.hud.touchMeasurement.clear()
      }
      return superResult
    })
  }
}

function isOwnRuler(ruler) {
  return FoundryCanvas.ruler === ruler
}

function getSettingValue() {
  return game.settings.get(MODULE_NAME, MEASUREMENT_HUD_SETTING)
}

function isEnabled() {
  return getSettingValue() !== MEASUREMENT_HUD_OFF
}
