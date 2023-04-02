import AbstractApiService from '@/service/AbstractApiService'

export default class NnService extends AbstractApiService {
  constructor() {
    super('/api/nn')
  }

  get_nn_enable() {
    return this.get('')
  }

  set_nn_enable(val: boolean) {
    return this.update('', {enable: val})
  }

  get_frame_skip() {
    return this.get('skip')
  }

  set_frame_skip(val: number) {
    return this.update('skip', {skip: val})
  }
}