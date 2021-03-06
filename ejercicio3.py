text = "afoolishconsistencyisthehobgoblinoflittlemindsadoredbylittlestatesmenandphilosophersanddivineswithconsistencyagreatsoulhassimplynothingtodohemayaswellconcernhimselfwithhisshadowonthewallspeakwhatyouthinknowinhardwordsandtomorrowspeakwhattomorrowthinksinhardwordsagainthoughitcontradicteverythingyousaidtodayahsoyoushallbesuretobemisunderstoodisitsobadthentobemisunderstoodpythagoraswasmisunderstoodandsocratesandjesusandlutherandcopernicusandgalileoandnewtonandeverypureandwisespiritthatevertookfleshtobegreatistobemisunderstood"

def reverse_string(string):
    return string[::-1]

def compare_string(normal_string,inverse_string_param):
    return normal_string == reverse_string(inverse_string_param)

def get_multiple_strings_from_text(text, output_string_lenght):
    array = []
    index = 0
    while(index < len(text) - 1):
        if index + output_string_lenght == len(text) + 2:
            break
        array.append(text[index : index + output_string_lenght])
        index += 1
    return array

def remove_dupe(l):
    return list(dict.fromkeys(l))

def get_list_of_words(text,min_word_size = 3,max_word_size = 20):
    assert min_word_size < max_word_size
    list_of_words = []
    index = min_word_size
    while index < max_word_size + 1:
        list1 = get_multiple_strings_from_text(text, index)
        list_of_words.extend(list1)
        index += 1
    return remove_dupe(list_of_words)

def get_equals_items_from_lists(nlist,reverse_list):
    l = []
    for element1 in nlist:
        for element2 in reverse_list:
            if (element1 == element2):
                l.append(element1)
    return remove_dupe(l)
    

if __name__ == "__main__":
    
    MIN_WORD_SIZE = 3 # EL MINIMO QUE SE CONSIDERA UNA PALABRA
    MAX_WORD_SIZE = 20 # EL MAXIMO QUE SE CONSIDERA UNA PALABRA

    print("determinando cantidad de palabras....")
    word_list = get_list_of_words(text, min_word_size = MIN_WORD_SIZE, max_word_size = MAX_WORD_SIZE)
    print("determinando cantidad de palabras a la inversa...")
    reverse_word_list = get_list_of_words(reverse_string(text), min_word_size = MIN_WORD_SIZE, max_word_size = MAX_WORD_SIZE)
    print("analizando igualdad de cadenas de texto...")
    equals_elements = get_equals_items_from_lists(word_list,reverse_word_list)
    print("palabras que son iguales al revéz en el texto:", equals_elements)





    
    
    



