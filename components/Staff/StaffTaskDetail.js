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
  SegmentedButtons,
  Divider,
} from "react-native-paper";
import { TouchableOpacity } from "react-native";

const StaffTaskDetail = ({ navigation, route }) => {
  const { id, staffInfo } = route.params;

  const [loading, setLoading] = useState(false);
  const [dataTaskDetail, setDataTaskDetail] = useState([]);

  React.useEffect(() => {
    const fetchDataTask = async () => {
      if (staffInfo !== null) {
        setLoading(true);
        try {
          const taskUrl = `https://e-tailorapi.azurewebsites.net/api/task/${id}`;
          const response = await fetch(taskUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${staffInfo.token}`,
            },
          });
          if (response.ok && response.status === 200) {
            const responseData = await response.json();
            console.log("response", responseData);
            setDataTaskDetail(responseData);
          }
        } catch (error) {
          console.error("Error calling API:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchDataTask();
  }, []);
  console.log("Detail task", dataTaskDetail);
  const _goBack = () => navigation.navigate("Staff-Tasks");

  const [visible, setVisible] = React.useState(false);

  const hideDialog = () => setVisible(false);

  const [startWork, setStartWork] = useState(0);

  const Item = ({ item }) => (
    <View
      style={{
        width: "50%",
        height: 50,
        marginTop: 10,
        padding: 10,
      }}
    >
      <Text
        style={{
          alignItems: "center",
          textAlign: "center",
          textAlignVertical: "center",
          borderRadius: 10,
          backgroundColor: "white",
          width: "100%",
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
        {item.bodySize.name}: {item.value}
      </Text>
    </View>
  );

  return (
    <>
      {loading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator animating={true} color={"#9F78FF"} />
        </View>
      ) : (
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
          <View style={{ backgroundColor: "white", flex: 1, paddingTop: 10 }}>
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
                      {dataTaskDetail?.name}
                    </Text>
                  }
                  id={"1"}
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
                      source={{
                        uri: dataTaskDetail?.productTemplate?.thumbnailImage,
                      }}
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
                      Bản mẫu: {dataTaskDetail?.productTemplate?.name}
                    </Text>
                    <Text
                      variant="titleMedium"
                      style={{ marginTop: 10, marginLeft: 15 }}
                    >
                      Ghi chú:{" "}
                      {dataTaskDetail?.note === ""
                        ? "Chưa có ghi chú!!!"
                        : dataTaskDetail?.note}
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
                      Vải sử dụng
                    </Text>
                  }
                  id={"1"}
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
                      source={{
                        uri: dataTaskDetail?.fabricMaterial?.image,
                      }}
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
                      Tên vải sử dụng: {dataTaskDetail?.fabricMaterial?.name}
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
                  id={"1"}
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
                    <Text
                      variant="titleMedium"
                      style={{ marginTop: 10, marginLeft: 10 }}
                    >
                      Số đo cơ thể:
                    </Text>
                    <View style={{ maxHeight: "100%", marginBottom: 10 }}>
                      <FlatList
                        numColumns={2}
                        data={dataTaskDetail?.productBodySizes}
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
                      {dataTaskDetail.productStages?.map((stage) => {
                        let iconComponent;

                        switch (stage.status) {
                          case 1:
                            iconComponent = (
                              <Icon
                                name="sync-circle-outline"
                                size={30}
                                style={{
                                  color: "rgb(48, 176, 166)",
                                  marginLeft: 10,
                                }}
                              />
                            );
                            break;
                          case 2:
                            iconComponent = (
                              <Icon
                                name="ellipsis-horizontal-outline"
                                size={30}
                                style={{
                                  color: "rgb(171, 167, 43)",
                                  marginLeft: 10,
                                }}
                              />
                            );
                            break;
                          case 3:
                            iconComponent = (
                              <Icon
                                name="ellipsis-horizontal-circle-outline"
                                size={30}
                                style={{
                                  color: "rgb(194, 44, 41)",
                                  marginLeft: 10,
                                }}
                              />
                            );
                            break;
                          case 4:
                            iconComponent = (
                              <Icon
                                name="checkmark-circle-outline"
                                size={30}
                                style={{
                                  color: "rgb(44, 176, 77)",
                                  marginLeft: 10,
                                }}
                              />
                            );
                            break;
                          default:
                            iconComponent = (
                              <Icon
                                name="close-circle-outline"
                                size={30}
                                style={{ color: "red", marginLeft: 10 }}
                              />
                            );
                            break;
                        }
                        return (
                          <List.Accordion
                            expanded="false"
                            title={
                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <Text
                                  variant="titleLarge"
                                  style={{
                                    marginLeft: 15,
                                    fontWeight: "bold",
                                  }}
                                >
                                  Bước {stage?.stageNum}:{" "}
                                  {stage?.templateStageName}
                                </Text>
                                <View style={{ marginLeft: 150 }}>
                                  {iconComponent}
                                </View>
                              </View>
                            }
                            id={stage?.stageNum}
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
                                flex: 1,
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
                              <View style={{ flex: 1 }}>
                                <View style={{ flexDirection: "row" }}>
                                  <View
                                    style={{
                                      flex: 1,
                                      marginTop: 15,
                                      padding: 10,
                                    }}
                                  >
                                    <Text
                                      variant="headlineSmall"
                                      style={{ marginTop: 10 }}
                                    >
                                      Thời hạn:{" "}
                                      {stage?.deadline === null
                                        ? "Chưa có deadline!!!"
                                        : stage?.deadline}
                                    </Text>
                                    {startWork === 1 ? (
                                      <Button
                                        icon={() => (
                                          <Icon
                                            name="alert-circle-outline"
                                            size={20}
                                            color="rgb(154, 163, 59)"
                                          />
                                        )}
                                        textColor="rgb(154, 163, 59)"
                                        onPress={() => setStartWork(0)}
                                        style={{
                                          width: "100%",
                                          marginTop: 25,
                                          alignSelf: "center",
                                          alignSelf: "center",
                                          backgroundColor:
                                            "rgba(235, 250, 75, 0.6)",
                                          color: "rgb(154, 163, 59)",
                                          borderRadius: 5,
                                          borderWidth: 1,
                                          borderColor: "rgb(154, 163, 59)",
                                        }}
                                      >
                                        Tạm dừng
                                      </Button>
                                    ) : (
                                      <Button
                                        icon={() => (
                                          <Icon
                                            name="flag"
                                            size={20}
                                            color="rgb(63, 155, 158)"
                                          />
                                        )}
                                        textColor="rgb(63, 155, 158)"
                                        onPress={() => setStartWork(1)}
                                        style={{
                                          width: "100%",
                                          marginTop: 25,
                                          alignSelf: "center",
                                          backgroundColor:
                                            "rgba(113, 240, 245, 0.6)",
                                          color: "rgb(63, 155, 158)",
                                          borderRadius: 5,
                                          borderWidth: 1,
                                          borderColor: "rgb(63, 155, 158)",
                                        }}
                                      >
                                        Bắt đầu
                                      </Button>
                                    )}
                                  </View>
                                </View>
                              </View>
                              <Divider bold="true" />
                              <View>
                                <View
                                  style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                  }}
                                >
                                  <Button
                                    icon={() => (
                                      <Icon
                                        name="eye"
                                        size={20}
                                        color="rgb(51, 86, 150)"
                                      />
                                    )}
                                    textColor="rgb(51, 86, 150)"
                                    onPress={() => setVisible(true)}
                                    style={{
                                      width: "40%",
                                      marginTop: 15,
                                      marginBottom: 15,
                                      alignSelf: "center",
                                      backgroundColor:
                                        "rgba(61, 118, 224, 0.6)",
                                      color: "rgb(51, 86, 150)",
                                      borderRadius: 5,
                                      borderWidth: 1,
                                      borderColor: "rgb(51, 86, 150)",
                                    }}
                                  >
                                    Chi tiết
                                  </Button>
                                  <Button
                                    icon={() => (
                                      <Icon
                                        name="checkmark-outline"
                                        size={20}
                                        color="rgb(66, 150, 86)"
                                      />
                                    )}
                                    textColor="rgb(66, 150, 86)"
                                    style={{
                                      width: "40%",
                                      marginTop: 15,
                                      marginBottom: 15,
                                      alignSelf: "center",
                                      backgroundColor:
                                        "rgba(82, 247, 120, 0.6)",
                                      color: "rgb(66, 150, 86)",
                                      borderRadius: 5,
                                      borderWidth: 1,
                                      borderColor: "rgb(66, 150, 86)",
                                    }}
                                  >
                                    Hoàn thành
                                  </Button>
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
                                            {stage?.productComponents?.map(
                                              (component) => {
                                                return (
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
                                                            uri:
                                                              component?.image ===
                                                                null ||
                                                              component?.image ===
                                                                ""
                                                                ? "Không có hình ảnh!!!"
                                                                : component?.image,
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
                                                          {component?.name}
                                                        </Text>
                                                      </View>
                                                    }
                                                    id={component?.id}
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
                                                      <View
                                                        style={{
                                                          flex: 1,
                                                          flexDirection: "row",
                                                        }}
                                                      >
                                                        <Image
                                                          source={{
                                                            uri: "https://picsum.photos/700",
                                                          }}
                                                          style={{
                                                            width: "50%",
                                                            height: 100,
                                                            alignSelf: "center",
                                                            borderRadius: 10,
                                                            marginTop: 5,
                                                            marginBottom: 5,
                                                            marginLeft: 5,
                                                          }}
                                                          resizeMode="cover"
                                                        />
                                                        <Text
                                                          variant="labelSmall"
                                                          style={{
                                                            marginTop: 10,
                                                            padding: 10,
                                                          }}
                                                        >
                                                          Tên kiểu: Tên kiểu 1
                                                        </Text>
                                                      </View>
                                                      <View
                                                        style={{
                                                          marginTop: 5,
                                                          flex: 1,
                                                        }}
                                                      >
                                                        <Text
                                                          variant="titleSmall"
                                                          style={{
                                                            marginLeft: 5,
                                                          }}
                                                        >
                                                          Hình ảnh bổ sung
                                                        </Text>
                                                        <View
                                                          style={{
                                                            marginTop: 5,
                                                            flexDirection:
                                                              "row",
                                                            flex: 1,
                                                            justifyContent:
                                                              "space-between",
                                                          }}
                                                        >
                                                          <Image
                                                            source={{
                                                              uri: "https://picsum.photos/700",
                                                            }}
                                                            style={{
                                                              width: "40%",
                                                              height: 100,
                                                              alignSelf:
                                                                "center",
                                                              borderRadius: 10,
                                                              marginTop: 5,
                                                              marginBottom: 5,
                                                              marginLeft: 5,
                                                            }}
                                                            resizeMode="cover"
                                                          />
                                                          <Text
                                                            variant="labelSmall"
                                                            style={{
                                                              flex: 1,
                                                              marginTop: 5,
                                                              padding: 10,
                                                            }}
                                                          >
                                                            Ghi chú: Đính hột
                                                            xoang kim cương
                                                          </Text>
                                                        </View>
                                                        <View
                                                          style={{
                                                            marginTop: 5,
                                                            flexDirection:
                                                              "row",
                                                            flex: 1,
                                                            justifyContent:
                                                              "space-between",
                                                          }}
                                                        >
                                                          <Image
                                                            source={{
                                                              uri: "https://picsum.photos/700",
                                                            }}
                                                            style={{
                                                              width: "40%",
                                                              height: 100,
                                                              alignSelf:
                                                                "center",
                                                              borderRadius: 10,
                                                              marginTop: 5,
                                                              marginBottom: 5,
                                                              marginLeft: 5,
                                                            }}
                                                            resizeMode="cover"
                                                          />
                                                          <Text
                                                            variant="labelSmall"
                                                            style={{
                                                              flex: 1,
                                                              marginTop: 5,
                                                              padding: 10,
                                                            }}
                                                          >
                                                            Ghi chú: Đính hột
                                                            xoang kim cương
                                                          </Text>
                                                        </View>
                                                      </View>
                                                    </View>
                                                  </List.Accordion>
                                                );
                                              }
                                            )}
                                          </View>
                                        </List.AccordionGroup>
                                      </ScrollView>
                                    </Dialog.Content>
                                  </Dialog>
                                </Portal>
                              </View>
                            </View>
                          </List.Accordion>
                        );
                      })}
                    </List.AccordionGroup>
                  </View>
                </List.Accordion>
              </List.AccordionGroup>
            </ScrollView>
          </View>
        </>
      )}
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
