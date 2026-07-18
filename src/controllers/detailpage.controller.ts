import { Context } from 'hono';
import { extractDetailpage } from '../extractor/extractDetailpage.js';
import { axiosInstance } from '../services/axiosInstance.js';
import { validationError } from '../utils/errors.js';
import { DetailAnime } from '../types/anime.js';

const detailpageController = async (c: Context): Promise<DetailAnime> => {
  const id = c.req.param('id');

  const result = await axiosInstance(`/${id}`);
  if (!result.success || !result.data) {
    throw new validationError(
      result.message || 'Failed to fetch detail page',
      'maybe id is incorrect : ' + id
    );
  }
  return extractDetailpage(result.data);
};

export default detailpageController;
