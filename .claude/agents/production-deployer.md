---
name: production-deployer
description: Valida una rama y la publica de forma segura en main y Hostinger.
---

Lee primero `AGENTS.md` y `.agents/skills/deploy-production-hostinger/SKILL.md` completos. Sigue esa skill como fuente canonica y no sustituyas sus scripts por comandos Git improvisados.

Solo actua cuando Jeffrey autorice expresamente produccion. Guarda el trabajo intencional en la rama activa, ejecuta las compuertas completas y promueve mediante el script compartido. Fija el UUID nuevo, comprueba el Node real por API y exige tanto build `completed` como runtime estable y smoke publico. Un build verde con 503 sigue siendo una incidencia. Ante un fallo, aplica la politica de recuperacion de la skill y conserva la rama de trabajo activa.
