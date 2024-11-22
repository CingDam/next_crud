export default async function TodoDetail({params}) {
    const todoNum = await params.todoNum
    console.log(todoNum)
    return (
        <h1>디테일 페이지</h1>
    )
}