import math
import random

def get_rango(distancia):
    return math.floor( distancia / 100 + 1 )

def get_distancia(origen,destino):
    return abs(origen - destino)
    
def get_dias(rango):
    if rango <= 1:
        return 0
    if rango == 2:
        return 1
    return get_dias( rango - 1) + get_dias( rango - 2)


if __name__ == "__main__":
    MIN_RANGO = 0
    MAX_RANGO = 2000

    MUESTRAS = 100
    for x in range(MUESTRAS):
        comienza = random.randint(MIN_RANGO, MAX_RANGO)
        termina = random.randint(MIN_RANGO, MAX_RANGO)

        distancia = get_distancia(comienza,termina)
        rango = get_rango(distancia)
        dias = get_dias(rango)

        print("Entre {}km y {}km hay una distancia de {}km (tiene un rango de {}), por tanto el paquete se entregara en:\t {} dias"
                .format(comienza,termina,distancia,rango,dias))


    #print(get_dias(get_rango(450)))
