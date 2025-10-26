export function sendJson(ctx: any, data: any) {
    ctx.response.headers.set("Content-Type", "application/json");
    ctx.response.body = JSON.stringify(data);
}

export function sendError(ctx: any, status: number, message: string) {
    ctx.response.status = status;
    ctx.response.body = { error: message };
}