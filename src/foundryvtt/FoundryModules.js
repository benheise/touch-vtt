class FoundryModules {
  isActive(key) {
    const module = game.modules.get(key)
    return module?.active
  }
}

export default new FoundryModules()
