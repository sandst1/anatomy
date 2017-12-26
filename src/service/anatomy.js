import axios from 'axios'

class AnatomyService {
  BASE_PATH = 'http://localhost:3000'

  async fetchAnatomy() {
    const response = await axios.get(`${this.BASE_PATH}/db`);
    return response.data;
  }
}

export default new AnatomyService()
