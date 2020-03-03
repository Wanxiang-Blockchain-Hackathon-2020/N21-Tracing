pragma solidity >=0.4.21 <0.7.0;


contract MASToken {

    /// total amount of tokens
    uint256 public totalSupply;

    /// @param _owner The address from which the balance will be retrieved
    /// @return The balance
    function balanceOf(address _owner) public view returns (uint256 balance);

    /// @notice send `_value` token to `_to` from `msg.sender`
    /// @param _to The address of the recipient
    /// @param _value The amount of token to be transferred
    /// @return Whether the transfer was successful or not
    function transfer(address _to, uint256 _value) public returns (bool success);

    /// @notice send `_value` token to `_to` from `_from` on the condition it is approved by `_from`
    /// @param _from The address of the sender
    /// @param _to The address of the recipient
    /// @param _value The amount of token to be transferred
    /// @return Whether the transfer was successful or not
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success);

    /// @notice `msg.sender` approves `_spender` to spend `_value` tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @param _value The amount of tokens to be approved for transfer
    /// @return Whether the approval was successful or not
    function approve(address _spender, uint256 _value) public returns (bool success);

    /// @param _owner The address of the account owning tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @return Amount of remaining tokens allowed to spent
    function allowance(address _owner, address _spender) public view returns (uint256 remaining);

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
}


contract ChainTrade{

    // event for EVM logging
    // event OwnerSet(address indexed oldOwner, address indexed newOwner);
    // event TradeSet(uint256 tradeNo,address indexed tradeFrom, address indexed tradeTo, uint256 status);

//交易详情
    struct TradeDetails {
        address tradeFrom;//发货人地址
        address tradeTo;//收货人地址
        uint256 masTokenAmount;//口罩token数量
        uint256 tradeNo;//订单号
        uint256 status;  //状态 0：已发货 1：已收货
        uint256 updateTime;//更新时间

    }

    mapping(uint256=>TradeDetails) tradeMapping;//交易记录

    address public _owner ;

    MASToken public masToken = MASToken(0x0e4a5f081842668D4E4107176dcb1a444c213596);//初始化该合约


    //构造函数
    constructor() public {
        _owner = msg.sender;
        // emit OwnerSet(address(0), _owner);
    }

    //发货人发货
    function sendTrade(address _tradeTo,uint256 _amount,uint256 _tradeNo) public returns (bool) {

        require(msg.sender != address(0));


        //生成订单记录

        tradeMapping[_tradeNo] = TradeDetails({
                tradeFrom:msg.sender,
                tradeTo:_tradeTo,
                masTokenAmount:_amount,
                tradeNo:_tradeNo,
                status:0,
                updateTime:now
        });

        // emit TradeSet(_tradeNo,msg.sender,_tradeTo, 0);
        return true;

    }


    //收货人确认收货
    function confirmTrade(uint256 _tradeNo) public returns (bool) {

        require(msg.sender != address(0));

        //判断该交易是否确认过
        require(tradeMapping[_tradeNo].status !=1 );

        //判断该交易是否是自己的交易
        require(tradeMapping[_tradeNo].tradeTo == msg.sender );

        //token获取
        bool transferRlt = masToken.transferFrom(
            tradeMapping[_tradeNo].tradeFrom,
            msg.sender,
            tradeMapping[_tradeNo].masTokenAmount
            );

        if(transferRlt){
            tradeMapping[_tradeNo].status = 1;
            tradeMapping[_tradeNo].updateTime = now;
            // emit TradeSet(_tradeNo,tradeMapping[_tradeNo].tradeFrom,msg.sender, 1);

            return true;
        }else{
            return false;
        }

    }


    /**
     * @dev Return owner address
     * @return address of owner
     */
    function getOwner() public view returns (address) {
        return _owner;
    }

    //返回交易记录status
    function getTradeInfoStatus(uint256 _tradeNo) public view returns (uint){
        return tradeMapping[_tradeNo].status;
    }

    //返回交易记录to
    function getTradeInfoTo(uint256 _tradeNo) public view returns (address){
        return tradeMapping[_tradeNo].tradeTo;
    }

    //返回交易记录数量
    function getTradeInfoAmount(uint256 _tradeNo) public view returns (uint){
        return tradeMapping[_tradeNo].masTokenAmount;
    }

}