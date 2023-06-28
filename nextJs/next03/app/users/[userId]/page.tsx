import getUser from "@/app/lib/getUser"
import getUserPosts from "@/app/lib/getUserPosts"
import { Suspense } from "react"
import UserPost from "./components/UserPost"
import { Metadata } from "next"

type Params = {
    params: {
        userId: string
    }
}

export async function generateMetadata({params: {userId}}: Params) : Promise <Metadata> {
  const userData: Promise<User> = getUser(userId)
  const user: User = await userData

  return{
    title: user.name,
    description: `This is the page of ${user.name}`
  }
  
}

export default async function UserPage({params: {userId}}: Params) {
    const userData: Promise<User> = getUser(userId)
    const userPostData: Promise<Post[]> = getUserPosts(userId)

    //const [user, userPosts] = await Promise.all([userData, userPostData])
    const user = await userData

  return (
    <>
      <h2>{user.name}</h2>
      <br/>
      <Suspense fallback={<h2>Loading...</h2>}>
      <UserPost promise={userPostData}/>
      </Suspense>
      
    </>
  )
}
