class AnatomyService {
  // Not using a server at least for now
  async fetchAnatomy() {
    return require('../assets/anatomy.json');
  }
}

export default new AnatomyService()
