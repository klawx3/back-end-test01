def fibonnaci_infinite_generator():
    n1, n2 = 0, 1
    index = 0
    while True:
        yield n1
        new_number = n1 + n2
        n1 , n2 = n2 , new_number
        index += 1

def get_numbers_of_divisor(number):
    divisors, index = 0 , 1
    while index <= number:
        if number % index == 0:
            divisors += 1
        index += 1
    return divisors

if __name__ == "__main__":
    DIVISORES = 1000 # probar con un numero pequeño , de lo contrario demorara

    for fibonnaci_number in fibonnaci_infinite_generator():
        divisors = get_numbers_of_divisor(fibonnaci_number)
        if divisors >= DIVISORES:
            print("El numero fibonnaci {} tiene mas (o igual) de {} divisores, de hecho tiene: {}".format(fibonnaci_number,DIVISORES,divisors))
            break