# Enable the trigger for everyone
scoreboard players enable @a ckc_scan

# Detect when a player activates the trigger
execute as @a[scores={ckc_scan=1..}] at @s run function ckc_scan:scan

# Reset the trigger for those who used it
scoreboard players set @a[scores={ckc_scan=1..}] ckc_scan 0
