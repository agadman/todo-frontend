// Interface som beskriver strukturen för en Todo-objekt (från api:et)
export default interface TodoInterface {
    id: number;
    title: string;
    description: string;
    status: string;
    createdAt: string;
}