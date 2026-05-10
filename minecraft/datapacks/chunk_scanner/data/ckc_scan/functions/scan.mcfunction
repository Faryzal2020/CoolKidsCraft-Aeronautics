# Perform the replacement in a 64x64 area around the player to ensure the current chunk is covered.
# You can adjust the range (~-16 to ~15) if you want a smaller or larger area.
execute at @s run fill ~-32 -64 ~-32 ~31 319 ~31 air replace #ckc_scan:targets

# Feedback to player
tellraw @s {"text":"[Chunk Scanner] Scanned 64x64 area and replaced targets with air.","color":"green"}
