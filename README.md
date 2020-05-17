# Cloudflare Workers streams example

You need to use add a `wrangler.toml` file with your own ids:

```
name = "streams-test"
type = "javascript"
account_id = "XXXXX"
workers_dev = false
route = "example.com/stream"
zone_id = "XXXXX"
```

This worker in action: https://youtu.be/ftKvXQBmev8
