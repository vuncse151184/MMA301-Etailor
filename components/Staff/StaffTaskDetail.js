import { View, StyleSheet, Image, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {
  Appbar,
  TextInput,
  Button,
  Card,
  Title,
  Paragraph,
  ActivityIndicator,
  Text,
  Banner,
  List,
  Dialog,
  Portal,
} from "react-native-paper";
import { TouchableOpacity } from "react-native";

const StaffTaskDetail = ({ navigation }) => {
  const _goBack = () => navigation.navigate("Staff-Tasks");

  const [visible, setVisible] = React.useState(false);

  const hideDialog = () => setVisible(false);

  const [startWork, setStartWork] = useState(0);

  const dataProfileBody = [
    {
      id: "95dd8995-0b85-47fb-a76a-81741d",
      name: "Chiều dài tay",
      value: 45,
    },
    {
      id: "71f80212-6390-47e6-88a2-eebf93",
      name: "Rộng ngực",
      value: 55,
    },
    {
      id: "2f51d324-9167-47de-a535-941d31",
      name: "Rộng vai",
      value: 55,
    },
    {
      id: "8c1fa182-a6ce-4948-9e92-7c1d8c",
      name: "Cao cổ",
      value: 10,
    },
    {
      id: "e4ab7fbc-50fd-423b-87b4-50f91c",
      name: "Chiều rộng đùi",
      value: 55,
    },
    {
      id: "f43004fd-9d08-4453-9070-38cdc7",
      name: "Chiều dài chân",
      value: 55,
    },
    {
      id: "a1cc9784-2a71-4d6a-ae7b-d6c123",
      name: "Vòng ngực",
      value: 55,
    },
    {
      id: "9599f8df-c309-4322-9684-443afc",
      name: "Rộng cổ",
      value: 15,
    },
    {
      id: "24c0d96d-797b-46db-b16f-80c09f",
      name: "Vòng eo",
      value: 55,
    },
    {
      id: "326c8208-1081-401b-b9bc-611879",
      name: "Rộng ngực",
      value: 55,
    },
  ];

  const Item = ({ item }) => (
    <View
      style={{
        width: 200,
        height: 50,
        marginTop: 10,
        padding: 10,
      }}
    >
      <Text
        style={{
          borderRadius: 10,
          padding: 10,
          backgroundColor: "white",
          width: 150,
          height: 50,
          shadowColor: "#9F78FF",
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 10,
          shadowRadius: 3,
          elevation: 10,
        }}
      >
        {item.name}: {item.value}
      </Text>
    </View>
  );

  return (
    <>
      <Appbar.Header style={{ height: 40 }} statusBarHeight={0}>
        <View style={styles.headerContent}>
          <Appbar.BackAction onPress={_goBack} style={styles.backAction} />
          <Appbar.Content
            title="Chi tiết công việc"
            titleStyle={styles.title}
          />
        </View>
      </Appbar.Header>
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <ScrollView>
          <List.AccordionGroup>
            <List.Accordion
              expanded="false"
              title={
                <Text
                  variant="titleLarge"
                  style={{
                    marginTop: 10,
                    marginLeft: 15,
                    fontWeight: "bold",
                  }}
                >
                  Tên sản phẩm
                </Text>
              }
              id="1"
              style={{
                backgroundColor: "#f2f2f2",
                marginBottom: 10,
                marginTop: 10,
                marginLeft: "5%",
                marginRight: "5%",
                borderRadius: 15,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <View
                style={{
                  backgroundColor: "#f2f2f2",
                  marginBottom: 10,
                  marginLeft: "5%",
                  marginRight: "5%",
                  borderBottomLeftRadius: 15,
                  borderBottomRightRadius: 15,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
              >
                <Image
                  source={{ uri: "https://picsum.photos/700" }}
                  style={{
                    width: 200,
                    height: 200,
                    alignSelf: "center",
                    borderRadius: 10,
                    marginTop: 5,
                  }}
                  resizeMode="contain"
                />

                <Text
                  variant="titleMedium"
                  style={{ marginTop: 10, marginLeft: 15 }}
                >
                  Bản mẫu: Áo sơ mi tay dài
                </Text>
                <Text
                  variant="titleMedium"
                  style={{ marginTop: 10, marginLeft: 15 }}
                >
                  Ghi chú: Tay dài 6 phân
                </Text>
              </View>
            </List.Accordion>
          </List.AccordionGroup>
          <List.AccordionGroup>
            <List.Accordion
              expanded="false"
              title={
                <Text
                  variant="titleLarge"
                  style={{
                    marginTop: 10,
                    marginLeft: 15,
                    fontWeight: "bold",
                  }}
                >
                  Số đo cơ thể
                </Text>
              }
              id="1"
              style={{
                backgroundColor: "#f2f2f2",
                marginBottom: 10,
                marginTop: 10,
                marginLeft: "5%",
                marginRight: "5%",
                borderRadius: 15,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <View
                style={{
                  backgroundColor: "#f2f2f2",
                  marginBottom: 10,
                  marginLeft: "5%",
                  marginRight: "5%",
                  borderBottomLeftRadius: 15,
                  borderBottomRightRadius: 15,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
              >
                <View style={{ maxHeight: 500 }}>
                  <FlatList
                    numColumns={2}
                    data={dataProfileBody}
                    renderItem={({ item }) => <Item item={item} />}
                    keyExtractor={(item) => item.id}
                  />
                </View>
              </View>
            </List.Accordion>
          </List.AccordionGroup>
          <List.AccordionGroup>
            <List.Accordion
              expanded="true"
              title={
                <Text
                  variant="titleLarge"
                  style={{
                    marginTop: 10,
                    marginLeft: 15,
                    fontWeight: "bold",
                  }}
                >
                  Công việc
                </Text>
              }
              id="1"
              style={{
                backgroundColor: "#f2f2f2",
                marginBottom: 10,
                marginTop: 10,
                marginLeft: "5%",
                marginRight: "5%",
                borderRadius: 15,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  borderBottomLeftRadius: 15,
                  borderBottomRightRadius: 15,
                }}
              >
                <List.AccordionGroup>
                  <List.Accordion
                    expanded="false"
                    title={
                      <Text
                        variant="titleLarge"
                        style={{
                          marginTop: 10,
                          marginLeft: 15,
                          fontWeight: "bold",
                        }}
                      >
                        Bước 1
                      </Text>
                    }
                    id="1"
                    style={{
                      backgroundColor: "#f2f2f2",
                      marginBottom: 10,
                      marginTop: 10,
                      marginLeft: "5%",
                      marginRight: "5%",
                      borderRadius: 15,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 5,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#f2f2f2",
                        marginBottom: 10,
                        marginLeft: "5%",
                        marginRight: "5%",
                        borderBottomLeftRadius: 15,
                        borderBottomRightRadius: 15,
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                      }}
                    >
                      <View>
                        <Text
                          variant="titleLarge"
                          style={{ marginLeft: 40, marginTop: 10 }}
                        >
                          Tên vải: Tên vải 1
                        </Text>
                        <Text
                          variant="titleLarge"
                          style={{ marginLeft: 40, marginTop: 10 }}
                        >
                          Hình ảnh vải:
                        </Text>
                        <Image
                          source={{ uri: "https://picsum.photos/700" }}
                          style={{
                            width: "60%",
                            height: 150,
                            alignSelf: "center",
                            borderRadius: 10,
                            marginTop: 15,
                            marginBottom: 5,
                            marginLeft: 5,
                          }}
                          resizeMode="cover"
                        />
                        <Text
                          variant="titleLarge"
                          style={{ marginLeft: 40, marginTop: 10 }}
                        >
                          Thời hạn: 12/3/2024
                        </Text>
                      </View>
                      <View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <Button
                            icon={() => (
                              <Icon name="eye" size={20} color="white" />
                            )}
                            mode="contained"
                            onPress={() => setVisible(true)}
                            style={{
                              width: "30%",
                              marginTop: 15,
                              marginBottom: 15,
                              alignSelf: "center",
                            }}
                          >
                            Chi tiết
                          </Button>
                          {startWork === 1 ? (
                            <Button
                              icon={() => (
                                <Icon
                                  name="happy-outline"
                                  size={20}
                                  color="white"
                                />
                              )}
                              mode="contained"
                              onPress={() => setStartWork(0)}
                              style={{
                                width: "30%",
                                marginTop: 15,
                                marginBottom: 15,
                                alignSelf: "center",
                              }}
                            >
                              Kết thúc
                            </Button>
                          ) : (
                            <Button
                              icon={() => (
                                <Icon name="flag" size={20} color="white" />
                              )}
                              mode="contained"
                              onPress={() => setStartWork(1)}
                              style={{
                                width: "30%",
                                marginTop: 15,
                                marginBottom: 15,
                                alignSelf: "center",
                              }}
                            >
                              Bắt đầu
                            </Button>
                          )}
                        </View>
                        <Portal>
                          <Dialog
                            visible={visible}
                            onDismiss={hideDialog}
                            style={{
                              backgroundColor: "white",
                              maxHeight: "85%",
                              flex: 1,
                            }}
                          >
                            <Dialog.Content style={{ flex: 1 }}>
                              <Text
                                variant="headlineSmall"
                                style={{ marginTop: 5 }}
                              >
                                Chi tiết
                              </Text>
                              <ScrollView>
                                <List.AccordionGroup>
                                  <View>
                                    <List.Accordion
                                      expanded="false"
                                      title={
                                        <View
                                          style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                          }}
                                        >
                                          <Image
                                            source={{
                                              uri: "https://picsum.photos/700",
                                            }}
                                            style={{
                                              width: 40,
                                              height: 40,
                                              alignSelf: "center",
                                              borderRadius: 5,
                                              marginLeft: 5,
                                            }}
                                            resizeMode="cover"
                                          />
                                          <Text
                                            variant="titleLarge"
                                            style={{
                                              marginLeft: 15,
                                              fontWeight: "bold",
                                            }}
                                          >
                                            Tên sản phẩm
                                          </Text>
                                        </View>
                                      }
                                      id="1"
                                      style={{
                                        width: "100%",
                                        marginBottom: 5,
                                        marginTop: 10,
                                        borderRadius: 15,
                                        borderWidth: 1,
                                        borderColor: "#9F78FF",
                                      }}
                                    >
                                      <View
                                        style={{
                                          marginBottom: 10,
                                          borderBottomLeftRadius: 15,
                                          borderBottomRightRadius: 15,
                                          borderWidth: 1,
                                          borderColor: "#9F78FF",
                                          padding: 10,
                                        }}
                                      >
                                        <View>
                                          <Text variant="headlineSmall">
                                            Kiểu
                                          </Text>
                                          <Image
                                            source={{
                                              uri: "https://picsum.photos/700",
                                            }}
                                            style={{
                                              width: 150,
                                              height: 100,
                                              alignSelf: "center",
                                              borderRadius: 10,
                                              marginTop: 5,
                                              marginBottom: 5,
                                              marginLeft: 5,
                                            }}
                                            resizeMode="cover"
                                          />
                                        </View>
                                        <View style={{ marginTop: 5 }}>
                                          <Text variant="headlineSmall">
                                            Hình ảnh bổ sung
                                          </Text>
                                          <Image
                                            source={{
                                              uri: "https://picsum.photos/700",
                                            }}
                                            style={{
                                              width: 150,
                                              height: 100,
                                              alignSelf: "center",
                                              borderRadius: 10,
                                              marginTop: 5,
                                              marginBottom: 5,
                                              marginLeft: 5,
                                            }}
                                            resizeMode="cover"
                                          />
                                        </View>
                                        <View style={{ marginTop: 5 }}>
                                          <Text variant="headlineSmall">
                                            Ghi chú
                                          </Text>
                                          <TextInput
                                            multiline={true}
                                            numberOfLines={4}
                                            placeholder="Nhập ghi chú của bạn..."
                                            style={{
                                              borderWidth: 1,
                                              borderColor: "gray",
                                              borderRadius: 5,
                                              padding: 10,
                                              marginTop: 5,
                                            }}
                                            editable={false}
                                            value="Thêm hột xoàng đinh nút kim cương"
                                          />
                                        </View>
                                      </View>
                                    </List.Accordion>
                                    <List.Accordion
                                      expanded="false"
                                      title={
                                        <View
                                          style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                          }}
                                        >
                                          <Image
                                            source={{
                                              uri: "https://picsum.photos/700",
                                            }}
                                            style={{
                                              width: 40,
                                              height: 40,
                                              alignSelf: "center",
                                              borderRadius: 5,
                                              marginLeft: 5,
                                            }}
                                            resizeMode="cover"
                                          />
                                          <Text
                                            variant="titleLarge"
                                            style={{
                                              marginLeft: 15,
                                              fontWeight: "bold",
                                            }}
                                          >
                                            Tên sản phẩm
                                          </Text>
                                        </View>
                                      }
                                      id="2"
                                      style={{
                                        width: "100%",
                                        marginBottom: 5,
                                        marginTop: 10,
                                        borderRadius: 15,
                                        borderWidth: 1,
                                        borderColor: "#9F78FF",
                                      }}
                                    >
                                      <View
                                        style={{
                                          marginBottom: 10,
                                          borderBottomLeftRadius: 15,
                                          borderBottomRightRadius: 15,
                                          borderWidth: 1,
                                          borderColor: "#9F78FF",
                                          padding: 10,
                                        }}
                                      >
                                        <View>
                                          <Text variant="headlineSmall">
                                            Kiểu
                                          </Text>
                                          <Image
                                            source={{
                                              uri: "https://picsum.photos/700",
                                            }}
                                            style={{
                                              width: 150,
                                              height: 100,
                                              alignSelf: "center",
                                              borderRadius: 10,
                                              marginTop: 5,
                                              marginBottom: 5,
                                              marginLeft: 5,
                                            }}
                                            resizeMode="cover"
                                          />
                                        </View>
                                        <View style={{ marginTop: 5 }}>
                                          <Text variant="headlineSmall">
                                            Hình ảnh bổ sung
                                          </Text>
                                          <Image
                                            source={{
                                              uri: "https://picsum.photos/700",
                                            }}
                                            style={{
                                              width: 150,
                                              height: 100,
                                              alignSelf: "center",
                                              borderRadius: 10,
                                              marginTop: 5,
                                              marginBottom: 5,
                                              marginLeft: 5,
                                            }}
                                            resizeMode="cover"
                                          />
                                        </View>
                                        <View style={{ marginTop: 5 }}>
                                          <Text variant="headlineSmall">
                                            Ghi chú
                                          </Text>
                                          <TextInput
                                            multiline={true}
                                            numberOfLines={4}
                                            placeholder="Nhập ghi chú của bạn..."
                                            style={{
                                              borderWidth: 1,
                                              borderColor: "gray",
                                              borderRadius: 5,
                                              padding: 10,
                                              marginTop: 5,
                                            }}
                                            editable={false}
                                            value="Thêm hột xoàng đinh nút kim cương"
                                          />
                                        </View>
                                      </View>
                                    </List.Accordion>
                                    <List.Accordion
                                      expanded="false"
                                      title={
                                        <View
                                          style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                          }}
                                        >
                                          <Image
                                            source={{
                                              uri: "https://picsum.photos/700",
                                            }}
                                            style={{
                                              width: 40,
                                              height: 40,
                                              alignSelf: "center",
                                              borderRadius: 5,
                                              marginLeft: 5,
                                            }}
                                            resizeMode="cover"
                                          />
                                          <Text
                                            variant="titleLarge"
                                            style={{
                                              marginLeft: 15,
                                              fontWeight: "bold",
                                            }}
                                          >
                                            Tên sản phẩm
                                          </Text>
                                        </View>
                                      }
                                      id="3"
                                      style={{
                                        width: "100%",
                                        marginBottom: 5,
                                        marginTop: 10,
                                        borderRadius: 15,
                                        borderWidth: 1,
                                        borderColor: "#9F78FF",
                                      }}
                                    >
                                      <View
                                        style={{
                                          marginBottom: 10,
                                          borderBottomLeftRadius: 15,
                                          borderBottomRightRadius: 15,
                                          borderWidth: 1,
                                          borderColor: "#9F78FF",
                                          padding: 10,
                                        }}
                                      >
                                        <View>
                                          <Text variant="headlineSmall">
                                            Kiểu
                                          </Text>
                                          <Image
                                            source={{
                                              uri: "https://picsum.photos/700",
                                            }}
                                            style={{
                                              width: 150,
                                              height: 100,
                                              alignSelf: "center",
                                              borderRadius: 10,
                                              marginTop: 5,
                                              marginBottom: 5,
                                              marginLeft: 5,
                                            }}
                                            resizeMode="cover"
                                          />
                                        </View>
                                        <View style={{ marginTop: 5 }}>
                                          <Text variant="headlineSmall">
                                            Hình ảnh bổ sung
                                          </Text>
                                          <Image
                                            source={{
                                              uri: "https://picsum.photos/700",
                                            }}
                                            style={{
                                              width: 150,
                                              height: 100,
                                              alignSelf: "center",
                                              borderRadius: 10,
                                              marginTop: 5,
                                              marginBottom: 5,
                                              marginLeft: 5,
                                            }}
                                            resizeMode="cover"
                                          />
                                        </View>
                                        <View style={{ marginTop: 5 }}>
                                          <Text variant="headlineSmall">
                                            Ghi chú
                                          </Text>
                                          <TextInput
                                            multiline={true}
                                            numberOfLines={4}
                                            placeholder="Nhập ghi chú của bạn..."
                                            style={{
                                              borderWidth: 1,
                                              borderColor: "gray",
                                              borderRadius: 5,
                                              padding: 10,
                                              marginTop: 5,
                                            }}
                                            editable={false}
                                            value="Thêm hột xoàng đinh nút kim cương"
                                          />
                                        </View>
                                      </View>
                                    </List.Accordion>
                                  </View>
                                </List.AccordionGroup>
                              </ScrollView>
                            </Dialog.Content>
                          </Dialog>
                        </Portal>
                      </View>
                    </View>
                  </List.Accordion>
                  <List.Accordion
                    expanded="false"
                    title={
                      <Text
                        variant="titleLarge"
                        style={{
                          marginTop: 10,
                          marginLeft: 15,
                          fontWeight: "bold",
                        }}
                      >
                        Bước 2
                      </Text>
                    }
                    id="2"
                    style={{
                      backgroundColor: "#f2f2f2",
                      marginBottom: 10,
                      marginTop: 10,
                      marginLeft: "5%",
                      marginRight: "5%",
                      borderRadius: 15,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 5,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#f2f2f2",
                        marginBottom: 10,
                        marginLeft: "5%",
                        marginRight: "5%",
                        borderBottomLeftRadius: 15,
                        borderBottomRightRadius: 15,
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                      }}
                    >
                      <View>
                        <Text
                          variant="titleLarge"
                          style={{ marginLeft: 40, marginTop: 10 }}
                        >
                          Tên vải: Tên vải 1
                        </Text>
                        <Text
                          variant="titleLarge"
                          style={{ marginLeft: 40, marginTop: 10 }}
                        >
                          Hình ảnh vải:
                        </Text>
                        <Image
                          source={{ uri: "https://picsum.photos/700" }}
                          style={{
                            width: "60%",
                            height: 150,
                            alignSelf: "center",
                            borderRadius: 10,
                            marginTop: 15,
                            marginBottom: 5,
                            marginLeft: 5,
                          }}
                          resizeMode="cover"
                        />
                        <Text
                          variant="titleLarge"
                          style={{ marginLeft: 40, marginTop: 10 }}
                        >
                          Thời hạn: 12/3/2024
                        </Text>
                      </View>
                      <View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <Button
                            icon={() => (
                              <Icon name="eye" size={20} color="white" />
                            )}
                            mode="contained"
                            onPress={() => setVisible(true)}
                            style={{
                              width: "30%",
                              marginTop: 15,
                              marginBottom: 15,
                              alignSelf: "center",
                            }}
                          >
                            Chi tiết
                          </Button>
                          {startWork === 1 ? (
                            <Button
                              icon={() => (
                                <Icon
                                  name="happy-outline"
                                  size={20}
                                  color="white"
                                />
                              )}
                              mode="contained"
                              onPress={() => setStartWork(0)}
                              style={{
                                width: "30%",
                                marginTop: 15,
                                marginBottom: 15,
                                alignSelf: "center",
                              }}
                            >
                              Kết thúc
                            </Button>
                          ) : (
                            <Button
                              icon={() => (
                                <Icon name="flag" size={20} color="white" />
                              )}
                              mode="contained"
                              onPress={() => setStartWork(1)}
                              style={{
                                width: "30%",
                                marginTop: 15,
                                marginBottom: 15,
                                alignSelf: "center",
                              }}
                            >
                              Bắt đầu
                            </Button>
                          )}
                        </View>
                        <Portal>
                          <Dialog
                            visible={visible}
                            onDismiss={hideDialog}
                            style={{
                              backgroundColor: "white",
                              maxHeight: "85%",
                              flex: 1,
                            }}
                          >
                            <Dialog.Content style={{ flex: 1 }}>
                              <Text
                                variant="headlineSmall"
                                style={{ marginTop: 5 }}
                              >
                                Chi tiết
                              </Text>
                              <ScrollView>
                                <List.AccordionGroup>
                                  <View>
                                    <List.Accordion
                                      expanded="false"
                                      title={
                                        <View
                                          style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                          }}
                                        >
                                          <Image
                                            source={{
                                              uri: "https://picsum.photos/700",
                                            }}
                                            style={{
                                              width: 40,
                                              height: 40,
                                              alignSelf: "center",
                                              borderRadius: 5,
                                              marginLeft: 5,
                                            }}
                                            resizeMode="cover"
                                          />
                                          <Text
                                            variant="titleLarge"
                                            style={{
                                              marginLeft: 15,
                                              fontWeight: "bold",
                                            }}
                                          >
                                            Tên sản phẩm
                                          </Text>
                                        </View>
                                      }
                                      id="1"
                                      style={{
                                        width: "100%",
                                        marginBottom: 5,
                                        marginTop: 10,
                                        borderRadius: 15,
                                        borderWidth: 1,
                                        borderColor: "#9F78FF",
                                      }}
                                    >
                                      <View
                                        style={{
                                          marginBottom: 10,
                                          borderBottomLeftRadius: 15,
                                          borderBottomRightRadius: 15,
                                          borderWidth: 1,
                                          borderColor: "#9F78FF",
                                          padding: 10,
                                        }}
                                      >
                                        <View>
                                          <Text variant="headlineSmall">
                                            Kiểu
                                          </Text>
                                          <Image
                                            source={{
                                              uri: "https://picsum.photos/700",
                                            }}
                                            style={{
                                              width: 150,
                                              height: 100,
                                              alignSelf: "center",
                                              borderRadius: 10,
                                              marginTop: 5,
                                              marginBottom: 5,
                                              marginLeft: 5,
                                            }}
                                            resizeMode="cover"
                                          />
                                        </View>
                                        <View style={{ marginTop: 5 }}>
                                          <Text variant="headlineSmall">
                                            Hình ảnh bổ sung
                                          </Text>
                                          <Image
                                            source={{
                                              uri: "https://picsum.photos/700",
                                            }}
                                            style={{
                                              width: 150,
                                              height: 100,
                                              alignSelf: "center",
                                              borderRadius: 10,
                                              marginTop: 5,
                                              marginBottom: 5,
                                              marginLeft: 5,
                                            }}
                                            resizeMode="cover"
                                          />
                                        </View>
                                        <View style={{ marginTop: 5 }}>
                                          <Text variant="headlineSmall">
                                            Ghi chú
                                          </Text>
                                          <TextInput
                                            multiline={true}
                                            numberOfLines={4}
                                            placeholder="Nhập ghi chú của bạn..."
                                            style={{
                                              borderWidth: 1,
                                              borderColor: "gray",
                                              borderRadius: 5,
                                              padding: 10,
                                              marginTop: 5,
                                            }}
                                            editable={false}
                                            value="Thêm hột xoàng đinh nút kim cương"
                                          />
                                        </View>
                                      </View>
                                    </List.Accordion>
                                    <List.Accordion
                                      expanded="false"
                                      title={
                                        <View
                                          style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                          }}
                                        >
                                          <Image
                                            source={{
                                              uri: "https://picsum.photos/700",
                                            }}
                                            style={{
                                              width: 40,
                                              height: 40,
                                              alignSelf: "center",
                                              borderRadius: 5,
                                              marginLeft: 5,
                                            }}
                                            resizeMode="cover"
                                          />
                                          <Text
                                            variant="titleLarge"
                                            style={{
                                              marginLeft: 15,
                                              fontWeight: "bold",
                                            }}
                                          >
                                            Tên sản phẩm
                                          </Text>
                                        </View>
                                      }
                                      id="2"
                                      style={{
                                        width: "100%",
                                        marginBottom: 5,
                                        marginTop: 10,
                                        borderRadius: 15,
                                        borderWidth: 1,
                                        borderColor: "#9F78FF",
                                      }}
                                    >
                                      <View
                                        style={{
                                          marginBottom: 10,
                                          borderBottomLeftRadius: 15,
                                          borderBottomRightRadius: 15,
                                          borderWidth: 1,
                                          borderColor: "#9F78FF",
                                          padding: 10,
                                        }}
                                      >
                                        <View>
                                          <Text variant="headlineSmall">
                                            Kiểu
                                          </Text>
                                          <Image
                                            source={{
                                              uri: "https://picsum.photos/700",
                                            }}
                                            style={{
                                              width: 150,
                                              height: 100,
                                              alignSelf: "center",
                                              borderRadius: 10,
                                              marginTop: 5,
                                              marginBottom: 5,
                                              marginLeft: 5,
                                            }}
                                            resizeMode="cover"
                                          />
                                        </View>
                                        <View style={{ marginTop: 5 }}>
                                          <Text variant="headlineSmall">
                                            Hình ảnh bổ sung
                                          </Text>
                                          <Image
                                            source={{
                                              uri: "https://picsum.photos/700",
                                            }}
                                            style={{
                                              width: 150,
                                              height: 100,
                                              alignSelf: "center",
                                              borderRadius: 10,
                                              marginTop: 5,
                                              marginBottom: 5,
                                              marginLeft: 5,
                                            }}
                                            resizeMode="cover"
                                          />
                                        </View>
                                        <View style={{ marginTop: 5 }}>
                                          <Text variant="headlineSmall">
                                            Ghi chú
                                          </Text>
                                          <TextInput
                                            multiline={true}
                                            numberOfLines={4}
                                            placeholder="Nhập ghi chú của bạn..."
                                            style={{
                                              borderWidth: 1,
                                              borderColor: "gray",
                                              borderRadius: 5,
                                              padding: 10,
                                              marginTop: 5,
                                            }}
                                            editable={false}
                                            value="Thêm hột xoàng đinh nút kim cương"
                                          />
                                        </View>
                                      </View>
                                    </List.Accordion>
                                    <List.Accordion
                                      expanded="false"
                                      title={
                                        <View
                                          style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                          }}
                                        >
                                          <Image
                                            source={{
                                              uri: "https://picsum.photos/700",
                                            }}
                                            style={{
                                              width: 40,
                                              height: 40,
                                              alignSelf: "center",
                                              borderRadius: 5,
                                              marginLeft: 5,
                                            }}
                                            resizeMode="cover"
                                          />
                                          <Text
                                            variant="titleLarge"
                                            style={{
                                              marginLeft: 15,
                                              fontWeight: "bold",
                                            }}
                                          >
                                            Tên sản phẩm
                                          </Text>
                                        </View>
                                      }
                                      id="3"
                                      style={{
                                        width: "100%",
                                        marginBottom: 5,
                                        marginTop: 10,
                                        borderRadius: 15,
                                        borderWidth: 1,
                                        borderColor: "#9F78FF",
                                      }}
                                    >
                                      <View
                                        style={{
                                          marginBottom: 10,
                                          borderBottomLeftRadius: 15,
                                          borderBottomRightRadius: 15,
                                          borderWidth: 1,
                                          borderColor: "#9F78FF",
                                          padding: 10,
                                        }}
                                      >
                                        <View>
                                          <Text variant="headlineSmall">
                                            Kiểu
                                          </Text>
                                          <Image
                                            source={{
                                              uri: "https://picsum.photos/700",
                                            }}
                                            style={{
                                              width: 150,
                                              height: 100,
                                              alignSelf: "center",
                                              borderRadius: 10,
                                              marginTop: 5,
                                              marginBottom: 5,
                                              marginLeft: 5,
                                            }}
                                            resizeMode="cover"
                                          />
                                        </View>
                                        <View style={{ marginTop: 5 }}>
                                          <Text variant="headlineSmall">
                                            Hình ảnh bổ sung
                                          </Text>
                                          <Image
                                            source={{
                                              uri: "https://picsum.photos/700",
                                            }}
                                            style={{
                                              width: 150,
                                              height: 100,
                                              alignSelf: "center",
                                              borderRadius: 10,
                                              marginTop: 5,
                                              marginBottom: 5,
                                              marginLeft: 5,
                                            }}
                                            resizeMode="cover"
                                          />
                                        </View>
                                        <View style={{ marginTop: 5 }}>
                                          <Text variant="headlineSmall">
                                            Ghi chú
                                          </Text>
                                          <TextInput
                                            multiline={true}
                                            numberOfLines={4}
                                            placeholder="Nhập ghi chú của bạn..."
                                            style={{
                                              borderWidth: 1,
                                              borderColor: "gray",
                                              borderRadius: 5,
                                              padding: 10,
                                              marginTop: 5,
                                            }}
                                            editable={false}
                                            value="Thêm hột xoàng đinh nút kim cương"
                                          />
                                        </View>
                                      </View>
                                    </List.Accordion>
                                  </View>
                                </List.AccordionGroup>
                              </ScrollView>
                            </Dialog.Content>
                          </Dialog>
                        </Portal>
                      </View>
                    </View>
                  </List.Accordion>
                </List.AccordionGroup>
              </View>
            </List.Accordion>
          </List.AccordionGroup>
        </ScrollView>
      </View>
    </>
  );
};

export default StaffTaskDetail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#fff",
    elevation: 0,
  },
  inputWrapper: {
    marginTop: 20,
    marginBottom: 20,
  },
  input: {
    width: 350,
    borderWidth: 5,
    borderColor: "#9f78ff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  cardImg: {
    width: 64,
    height: 64,
    resizeMode: "contain",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 0,
    paddingTop: 0,
  },
  cardContent: {
    width: 380,
    marginTop: 20,
    height: 170,
    textAlign: "center",
    alignItems: "center",
    paddingBottom: Platform.OS === "ios" ? 10 : 0,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: "#9f78ff",
  },
  cardTitle: {
    fontWeight: "bold",
    color: "#9f78ff",
  },
  cardParagraph: {
    fontSize: 14,
    width: 200,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  title: {
    flex: 1,
    textAlign: "center",
    marginRight: 25,
    marginTop: 5,
  },
});
