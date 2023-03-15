import Post from '@entities/post.entity'
import User from '@entities/user.entity'
import { useSeederFactory } from 'typeorm-extension'

export async function generatePost(count: number) {
  const user = await useSeederFactory(User).save()
  const createdPosts = await useSeederFactory(Post).saveMany(count, {
    user: user,
  })
  return {
    user,
    posts: createdPosts,
  }
}
