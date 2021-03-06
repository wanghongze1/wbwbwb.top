import axios from 'axios';
import config from '../config';

export default async function(ctx: Object, sweetOptions: Object): Promise<void>{
  const { data }: { data: Object } = await axios({
    url: `${ config.apiUri(sweetOptions.httpPort) }/48/live/list`,
    method: 'GET'
  });

  return {
    title: '口袋48成员直播',
    initialState: {
      time: new Date().getTime(),
      '48live': {
        lists: data
      }
    }
  };
}