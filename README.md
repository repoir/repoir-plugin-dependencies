Dependencies Repoir Plugin
==========================

Plugin that works with Repoir to ensure dependencies are up to date. You can configure Repoir to use it, just like this:

```json
{
    "plugins": [
        "dependencies"
    ],
    "rules": {
        "dependencies": {
            "unused": true,
            "outOfDate": true
        }
    }
}
```
