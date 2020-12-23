class Node:
    def __init__(self, value):
        self.value = value
        self.left = self
        self.right = self


def push_value(value, head):
    new_node = Node(value)
    new_node.right = head
    new_node.left = head.left.right
    head.left.right = new_node
    head.left = new_node
    return new_node


def day23(input):
    # parse the data
    cups_array = [int(char) for char in input]
    max_cup = 1000000
    min_cup = 1

    # quick lookup from label to cup
    lookup = [None] * int(1000001)

    # add the fixed cups
    head = Node(cups_array[0])
    lookup[cups_array[0]] = head
    for cup in cups_array[1:]:
        node = push_value(cup, head)
        lookup[cup] = node

    # add the remaining 1m cups
    for i in range(10, 1000001):
        node = push_value(i, head)
        lookup[i] = node

    # start the game
    current_cup = head
    for _ in range(10000000):
        # cut out three cups to the right of the current cup
        taken_cups = current_cup.right
        current_cup.right = current_cup.right.right.right.right
        # where to put the cups?
        search_value = current_cup.value
        destination = None
        while destination is None:
            # decrease search and wrap around
            search_value = search_value - 1
            if search_value < min_cup:
                search_value = max_cup
            # don't include the cups we've taken out
            if (
                search_value != taken_cups.value
                and search_value != taken_cups.right.value
                and search_value != taken_cups.right.right.value
            ):
                destination = lookup[search_value]
        # insert the cups back into the list
        taken_cups.right.right.right = destination.right
        destination.right = taken_cups
        # move to the next cup
        current_cup = current_cup.right

    # part 2 results
    one = lookup[1]
    print(
        "Done!",
        one.right.value,
        one.right.right.value,
        one.right.value * one.right.right.value,
    )


day23("916438275")
